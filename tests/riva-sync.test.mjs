import assert from 'node:assert/strict'
import { mkdtemp, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'
import test from 'node:test'
import { openRivaFeed, syncRivaCatalog } from '../scripts/lib/riva-sync.mjs'

const xml = ({ second = false } = {}) => `<?xml version="1.0" encoding="UTF-8"?>
<yml_catalog date="2026-09-12 10:00">
  <shop>
    <categories>
      <category id="3304">Кабинеты руководителей</category>
      <category id="3310" parentId="3304">Nova</category>
      <category id="3332" parentId="3310">Столы</category>
    </categories>
    <offers>
      <offer id="9001" available="true" group_id="8000">
        <url>https://riva.ru/catalog/item/9001/</url><price>16049</price><currencyId>RUR</currencyId><categoryId>3332</categoryId>
        <picture>https://static.riva.ru/upload/9001.jpg</picture><picture>https://static.riva.ru/upload/9001-angle.jpg</picture><name>Стол Nova N-1 Дуб 1180*720*750</name>
        <description><![CDATA[<p>Рабочий стол.</p>]]></description>
        <param name="Артикул">N-1</param><param name="Цвет изделия">Дуб</param><param name="Размер">1180*720*750</param><count>0</count>
      </offer>
      ${second ? `<offer id="9002" available="true" group_id="8000">
        <url>https://riva.ru/catalog/item/9002/</url><price>17000</price><currencyId>RUR</currencyId><categoryId>3332</categoryId>
        <picture>https://static.riva.ru/upload/9002.jpg</picture><name>Стол Nova N-2 Графит 1380*720*750</name>
        <param name="Артикул">N-2</param><param name="Цвет изделия">Графит</param><param name="Размер">1380*720*750</param><count>4</count>
      </offer>` : ''}
    </offers>
  </shop>
</yml_catalog>`

const makeWorkspace = async (feedTypes = [1, 2], maxImagesPerProduct = 12) => {
  const directory = await mkdtemp(resolve(tmpdir(), 'riva-sync-'))
  const configPath = resolve(directory, 'riva-sync.json')
  await writeFile(configPath, JSON.stringify({
    feedTypes,
    categoryByRootId: { 3304: 'executive-offices' },
    maxImagesPerProduct,
  }))
  return { directory, configPath }
}

const makeFetch = () => async (url) => {
  if (url.pathname === '/api/') {
    return new Response(null, { status: 302, headers: { location: `/feeds/${url.searchParams.get('type')}.xml` } })
  }
  const type = Number(url.pathname.match(/(\d+)\.xml$/)?.[1])
  return new Response(xml({ second: type === 2 }), { status: 200, headers: { 'content-type': 'text/xml' } })
}

test('follows a safe Riva redirect without exposing the API id', async () => {
  const response = await openRivaFeed({ type: 1, apiId: 'secret', apiBaseUrl: 'http://127.0.0.1/api/', fetchImpl: makeFetch(), sleepFn: async () => {} })
  assert.equal(response.status, 200)
})

test('streams feeds, removes duplicate offers and publishes a valid Riva snapshot', async () => {
  const workspace = await makeWorkspace()
  const result = await syncRivaCatalog({
    configPath: workspace.configPath,
    storageDir: workspace.directory,
    env: { RIVA_API_ID: 'test-id', RIVA_API_BASE_URL: 'http://127.0.0.1/api/', RIVA_SYNC_TIMEOUT_MS: '30000' },
    fetchImpl: makeFetch(),
    sleepFn: async () => {},
  })
  assert.equal(result.feedCount, 2)
  assert.equal(result.uniqueOfferCount, 2)
  assert.equal(result.duplicateOfferCount, 1)
  assert.equal(result.productCount, 1)
  assert.equal(result.variantCount, 2)
  assert.match(result.snapshot.products[0].name, /1180 × 720 × 750/)
  assert.equal(result.snapshot.products[0].specifications.Производитель, 'Riva')
  assert.equal(result.snapshot.products[0].variants[0].availability, 'on-order')
  assert.equal(result.snapshot.products[0].variants[1].availability, 'in-stock')
  assert.deepEqual(result.snapshot.products[0].variants[0].dimensions, { width: 1180, depth: 720, height: 750, label: '1180*720*750' })
  assert.deepEqual(result.snapshot.products[0].variants.map(variant => variant.color.name), ['Дуб', 'Графит'])
  const saved = JSON.parse(await readFile(resolve(workspace.directory, 'rivaCatalog.json'), 'utf8'))
  const meta = JSON.parse(await readFile(resolve(workspace.directory, 'rivaCatalog.meta.json'), 'utf8'))
  assert.equal(saved.products.length, 1)
  assert.match(meta.checksum, /^[a-f0-9]{64}$/)
})

test('prioritizes primary variant photos over extra angles within the image limit', async () => {
  const workspace = await makeWorkspace([1, 2], 2)
  const result = await syncRivaCatalog({
    configPath: workspace.configPath,
    storageDir: workspace.directory,
    env: { RIVA_API_ID: 'test-id', RIVA_API_BASE_URL: 'http://127.0.0.1/api/', RIVA_SYNC_TIMEOUT_MS: '30000' },
    fetchImpl: makeFetch(),
    sleepFn: async () => {},
  })
  const product = result.snapshot.products[0]
  assert.deepEqual(product.images.map(image => image.src), [
    'https://static.riva.ru/upload/9001.jpg',
    'https://static.riva.ru/upload/9002.jpg',
  ])
  assert.deepEqual(product.variants.map(variant => variant.imageIndex), [0, 1])
})

test('dry-run validates all data without publishing files', async () => {
  const workspace = await makeWorkspace([1])
  const result = await syncRivaCatalog({
    dryRun: true,
    configPath: workspace.configPath,
    storageDir: workspace.directory,
    env: { RIVA_API_ID: 'test-id', RIVA_API_BASE_URL: 'http://127.0.0.1/api/', RIVA_SYNC_TIMEOUT_MS: '30000' },
    fetchImpl: makeFetch(),
    sleepFn: async () => {},
  })
  assert.equal(result.dryRun, true)
  await assert.rejects(readFile(resolve(workspace.directory, 'rivaCatalog.json')), error => error.code === 'ENOENT')
})

test('rejects a redirect to an unrelated host', async () => {
  await assert.rejects(openRivaFeed({
    type: 1,
    apiId: 'test-id',
    apiBaseUrl: 'http://127.0.0.1/api/',
    fetchImpl: async () => new Response(null, { status: 302, headers: { location: 'https://example.com/feed.xml' } }),
    sleepFn: async () => {},
  }), /небезопасный адрес/)
})

test('keeps the previous Riva catalog when a later XML response is damaged', async () => {
  const workspace = await makeWorkspace([1])
  const options = {
    configPath: workspace.configPath,
    storageDir: workspace.directory,
    env: { RIVA_API_ID: 'test-id', RIVA_API_BASE_URL: 'http://127.0.0.1/api/', RIVA_SYNC_TIMEOUT_MS: '30000' },
    sleepFn: async () => {},
  }
  await syncRivaCatalog({ ...options, fetchImpl: makeFetch() })
  const before = await readFile(resolve(workspace.directory, 'rivaCatalog.json'), 'utf8')
  await assert.rejects(syncRivaCatalog({
    ...options,
    fetchImpl: async url => url.pathname === '/api/'
      ? new Response(null, { status: 302, headers: { location: '/feeds/1.xml' } })
      : new Response('<yml_catalog><shop><offers><offer>', { status: 200 }),
  }), /повреждённый XML/)
  const after = await readFile(resolve(workspace.directory, 'rivaCatalog.json'), 'utf8')
  assert.equal(after, before)
})
