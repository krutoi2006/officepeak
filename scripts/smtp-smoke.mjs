import { spawn } from 'node:child_process'
import { createServer } from 'node:net'

const messages = []
const smtpServer = createServer((socket) => {
  socket.setEncoding('utf8')
  socket.write('220 localhost ESMTP\r\n')
  let buffer = ''
  let dataMode = false
  let message = ''

  socket.on('data', (chunk) => {
    buffer += chunk
    while (buffer.includes('\n')) {
      const newline = buffer.indexOf('\n')
      const line = buffer.slice(0, newline).replace(/\r$/, '')
      buffer = buffer.slice(newline + 1)

      if (dataMode) {
        if (line === '.') {
          messages.push(message)
          message = ''
          dataMode = false
          socket.write('250 2.0.0 Message accepted\r\n')
        } else {
          message += `${line}\n`
        }
        continue
      }

      if (/^(EHLO|HELO)\b/i.test(line)) socket.write('250-localhost\r\n250-AUTH PLAIN\r\n250 SIZE 10485760\r\n')
      else if (/^AUTH\s+PLAIN\b/i.test(line)) socket.write('235 2.7.0 Authentication successful\r\n')
      else if (/^(MAIL FROM|RCPT TO)\b/i.test(line)) socket.write('250 2.1.0 OK\r\n')
      else if (/^DATA$/i.test(line)) { dataMode = true; socket.write('354 End data with <CR><LF>.<CR><LF>\r\n') }
      else if (/^QUIT$/i.test(line)) { socket.write('221 2.0.0 Bye\r\n'); socket.end() }
      else socket.write('250 2.0.0 OK\r\n')
    }
  })
})

await new Promise((resolve, reject) => {
  smtpServer.once('error', reject)
  smtpServer.listen(0, '127.0.0.1', resolve)
})
const smtpAddress = smtpServer.address()
if (!smtpAddress || typeof smtpAddress === 'string') throw new Error('Could not allocate a test SMTP port')

const appPort = '3129'
const app = spawn(process.execPath, ['.output/server/index.mjs'], {
  cwd: process.cwd(),
  env: {
    ...process.env,
    NITRO_PORT: appPort,
    NUXT_SMTP_HOST: '127.0.0.1',
    NUXT_SMTP_PORT: String(smtpAddress.port),
    NUXT_SMTP_SECURE: 'false',
    NUXT_SMTP_USER: 'smtp-test-user',
    NUXT_SMTP_PASS: 'smtp-test-password',
    NUXT_SMTP_FROM: 'OFFICEPEAK <sender@example.com>',
    NUXT_SMTP_TO: 'manager@example.com',
  },
  stdio: ['ignore', 'pipe', 'pipe'],
})
let appOutput = ''
app.stdout.on('data', chunk => { appOutput += chunk })
app.stderr.on('data', chunk => { appOutput += chunk })

const baseUrl = `http://127.0.0.1:${appPort}`
try {
  let ready = false
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const response = await fetch(baseUrl)
      if (response.ok) { ready = true; break }
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  if (!ready) throw new Error(`Production server did not start.\n${appOutput}`)

  const catalogResponse = await fetch(`${baseUrl}/api/catalog`)
  const catalogBody = await catalogResponse.json()
  const sampleProduct = catalogBody.catalog?.products?.find(product => product.variants.some(variant => variant.price > 0))
  const sampleVariant = sampleProduct?.variants.find(variant => variant.price > 0)
  if (!sampleProduct || !sampleVariant) throw new Error('Catalog does not contain an orderable SMTP test product')

  const lead = await fetch(`${baseUrl}/api/leads`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ type: 'callback', name: 'Тест SMTP', phone: '+70000000000', consent: true, website: '' }),
  })
  if (lead.status !== 201) throw new Error(`Lead SMTP request returned ${lead.status}: ${await lead.text()}`)

  const order = await fetch(`${baseUrl}/api/orders`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      name: 'Тест SMTP',
      phone: '+70000000000',
      consent: true,
      website: '',
      lines: [{ productId: sampleProduct.id, variantId: sampleVariant.id, quantity: 1 }],
    }),
  })
  if (order.status !== 201) throw new Error(`Order SMTP request returned ${order.status}: ${await order.text()}`)
  if (messages.length !== 2) throw new Error(`Expected two SMTP messages, received ${messages.length}`)
  if (!messages.every(messageText => messageText.includes('+70000000000'))) throw new Error('Phone is missing from an SMTP message')
  if (!messages[1].includes(sampleVariant.article)) throw new Error('Order details are missing from the SMTP message')

  console.log('SMTP smoke passed: lead and order emails were accepted by the local test server.')
} finally {
  app.kill()
  await new Promise(resolve => smtpServer.close(resolve))
}
