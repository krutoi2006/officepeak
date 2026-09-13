import { createTransport } from 'nodemailer'
import type { H3Event } from 'h3'

export type SubmissionKind = 'lead' | 'order'

type SmtpRuntimeConfig = {
  host?: unknown
  port?: unknown
  secure?: unknown
  user?: unknown
  pass?: unknown
  from?: unknown
  to?: unknown
}

const leadTypeLabels: Record<string, string> = {
  callback: 'Заказать звонок',
  design: 'Дизайн-проект',
  message: 'Обратная связь',
  manager: 'Вызов менеджера',
  tender: 'Заявка',
}

const escapeHtml = (value: unknown) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;')

const formatPrice = (value: unknown) => `${new Intl.NumberFormat('ru-RU').format(Number(value) || 0)} ₽`

const buildMail = (kind: SubmissionKind, payload: Record<string, unknown>) => {
  const requestId = String(payload.requestId ?? '')
  const rows: Array<[string, string]> = [
    ['Номер заявки', requestId],
    ['ФИО', String(payload.name ?? '')],
    ['Телефон', String(payload.phone ?? '')],
    ['Дата', String(payload.createdAt ?? '')],
  ]

  if (kind === 'lead') {
    rows.splice(1, 0, ['Тип заявки', leadTypeLabels[String(payload.type ?? '')] ?? String(payload.type ?? '')])
  }

  let orderText = ''
  let orderHtml = ''
  if (kind === 'order' && Array.isArray(payload.lines)) {
    const lines = payload.lines.filter((line): line is Record<string, unknown> => Boolean(line) && typeof line === 'object' && !Array.isArray(line))
    orderText = `\n\nСостав заказа:\n${lines.map((line, index) => `${index + 1}. ${line.productName} (${line.article}) — ${line.quantity} шт. × ${formatPrice(line.unitPrice)} = ${formatPrice(line.lineTotal)}`).join('\n')}\nИтого: ${formatPrice(payload.total)}`
    orderHtml = `<h2>Состав заказа</h2><ol>${lines.map(line => `<li>${escapeHtml(line.productName)} (${escapeHtml(line.article)}) — ${escapeHtml(line.quantity)} шт. × ${escapeHtml(formatPrice(line.unitPrice))} = ${escapeHtml(formatPrice(line.lineTotal))}</li>`).join('')}</ol><p><strong>Итого: ${escapeHtml(formatPrice(payload.total))}</strong></p>`
  }

  const title = kind === 'order' ? `Новый заказ ${requestId}` : `Новая заявка ${requestId}`
  const text = `${title}\n\n${rows.map(([label, value]) => `${label}: ${value}`).join('\n')}${orderText}`
  const html = `<h1>${escapeHtml(title)}</h1><table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse">${rows.map(([label, value]) => `<tr><th align="left">${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`).join('')}</table>${orderHtml}`
  return { title, text, html }
}

export const deliverSubmission = async (event: H3Event, kind: SubmissionKind, payload: Record<string, unknown>) => {
  const runtimeConfig = useRuntimeConfig(event)
  const smtp = runtimeConfig.smtp as SmtpRuntimeConfig
  const host = String(smtp.host || '').trim()
  const user = String(smtp.user || '').trim()
  const pass = String(smtp.pass || '')
  const to = String(smtp.to || '').trim()
  if (!host || !user || !pass || !to) return { configured: false, delivered: false }

  const port = Number(smtp.port) || 587
  const secure = smtp.secure === true || String(smtp.secure).toLowerCase() === 'true'
  const from = String(smtp.from || '').trim() || user
  const mail = buildMail(kind, payload)
  const transporter = createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
    tls: { minVersion: 'TLSv1.2', rejectUnauthorized: true },
  })

  await transporter.sendMail({ from, to, subject: mail.title, text: mail.text, html: mail.html })
  return { configured: true, delivered: true }
}
