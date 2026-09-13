import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'
import test from 'node:test'
import { createUnitexClient, syncUnitexCatalog } from '../scripts/lib/unitex-sync.mjs'

const fixedNow = new Date('2026-01-01T09:00:00.000Z')
const temporaryDirectories = []

test.afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map(path => rm(path, { recursive: true, force: true })))
})

const makeWorkspace = async (overrides = {}) => {
  const directory = await mkdtemp(resolve(tmpdir(), 'officepeak-unitex-test-'))
  temporaryDirectories.push(directory)
  const configPath = resolve(directory, 'config.json')
  await writeFile(configPath, JSON.stringify({
    city: 'moscow',
    allowedSeriesCodes: ['urus'],
    allowedSetCodes: [],
    manualSeries: [],
    productionOurOnly: false,
    allowedBaseProductIds: [],
    allowedVariantIds: [],
    currency: 'RUR',
    priceType: 'retail',
    maxSeriesImages: 3,
    categoryByUnitexId: { 1: 'executive-offices' },
    ...overrides,
  }))
  return { directory, configPath }
}

const seriesEnvelope = (ids = ['101', '102'], tokenTill = '2030-02-01 12:00:00') => ({
  version: '2024.0.37',
  token_till: { date: tokenTill },
  data: {
    urus: {
      id: 'urus',
      title: 'Кабинет У.РУС',
      title_short: 'У.РУС',
      description_tech: '<p>Описание <strong>серии</strong></p>',
      category: { id: 1, title: 'Кабинеты для руководителя' },
      producer: { title: 'Юнитекс' },
      country: { title: 'Россия' },
      images: ['https://static.unitex.ru/series/1.jpg', 'https://static.unitex.ru/series/2.jpg'],
      products_ids: ids,
    },
  },
})

const product = ({ id = '101', baseId = '500', price = 100_000, title = 'Стол руководителя', stock = 0 } = {}) => ({
  id,
  base_id: baseId,
  base_title: title,
  art: `ART-${id}`,
  color: { id: `color-${id}`, title: id === '101' ? 'Дуб светлый' : 'Графит' },
  description: '<p>Надёжный <script>alert(1)</script> стол.</p><ul><li>Кабель-канал</li></ul>',
  tech_overview: '<p>Чистый текст</p>',
  type: { id: 7, title: 'Столы' },
  sizes: { width: 1600, depth: 800, height: 750 },
  guarantee: 60,
  stock_count: stock,
  production_days: 20,
  price,
  images: [`https://static.unitex.ru/products/${id}.jpg`],
  producer: { title: 'Юнитекс' },
  country: { title: 'Россия' },
})

const productsEnvelope = (records, tokenTill = '2030-02-01 12:00:00') => ({
  version: '2024.0.37',
  token_till: { date: tokenTill },
  data: Object.fromEntries(records.map(record => [String(record.id ?? Math.random()), record])),
})

const jsonResponse = (body, status = 200, headers = {}) => new Response(JSON.stringify(body), { status, headers })

const makeFetch = ({ series = seriesEnvelope(), products = [product(), product({ id: '102', price: 0 })], productResponses, productsTokenTill } = {}) => {
  let productCall = 0
  return async (url) => {
    if (url.pathname.includes('/series/')) return jsonResponse(series)
    if (url.pathname.includes('/products/')) {
      const response = productResponses?.[productCall++]
      return response ?? jsonResponse(productsEnvelope(products, productsTokenTill))
    }
    return jsonResponse({}, 404)
  }
}

const run = async ({ config = {}, fetchImpl, dryRun = false, storageDir, now = () => fixedNow } = {}) => {
  const workspace = await makeWorkspace(config)
  return {
    workspace,
    result: await syncUnitexCatalog({
      dryRun,
      configPath: workspace.configPath,
      storageDir: storageDir ?? workspace.directory,
      env: { UNITEX_API_TOKEN: 'test-token', UNITEX_SYNC_TIMEOUT_MS: '30000' },
      fetchImpl: fetchImpl ?? makeFetch(),
      sleepFn: async () => {},
      testMinIntervalMs: 0,
      now,
    }),
  }
}

test('publishes a validated snapshot and maps zero stock to on-order', async () => {
  const { workspace, result } = await run()
  assert.equal(result.productCount, 1)
  assert.equal(result.variantCount, 2)
  assert.equal(result.snapshot.products[0].variants[0].availability, 'on-order')
  assert.equal(result.snapshot.products[0].variants[1].price, 0)
  assert.deepEqual(result.snapshot.products[0].variants.map(variant => variant.color.name), ['Дуб светлый', 'Графит'])
  assert.equal(result.snapshot.products[0].images.length, 2)
  assert.deepEqual(result.snapshot.collections[0].colors.map(color => color.name), ['Дуб светлый', 'Графит'])
  assert.doesNotMatch(result.snapshot.products[0].description, /<script|<p>/i)
  const saved = JSON.parse(await readFile(resolve(workspace.directory, 'unitexCatalog.json'), 'utf8'))
  const meta = JSON.parse(await readFile(resolve(workspace.directory, 'unitexCatalog.meta.json'), 'utf8'))
  assert.equal(saved.products.length, 1)
  assert.equal(meta.variantCount, 2)
  assert.match(meta.checksum, /^[a-f0-9]{64}$/)
})

test('dry-run validates data without publishing files', async () => {
  const { workspace, result } = await run({ dryRun: true })
  assert.equal(result.dryRun, true)
  await assert.rejects(readFile(resolve(workspace.directory, 'unitexCatalog.json')), error => error.code === 'ENOENT')
})

test('rejects an empty products response', async () => {
  const workspace = await makeWorkspace()
  await assert.rejects(syncUnitexCatalog({
    configPath: workspace.configPath,
    storageDir: workspace.directory,
    env: { UNITEX_API_TOKEN: 'test-token', UNITEX_SYNC_TIMEOUT_MS: '30000' },
    fetchImpl: makeFetch({ products: [] }), sleepFn: async () => {}, testMinIntervalMs: 0,
  }), /пустой список/)
})

test('retries HTTP 429 with increasing safe delay', async () => {
  const sleeps = []
  const workspace = await makeWorkspace({ allowedVariantIds: ['101'] })
  const ok = jsonResponse(productsEnvelope([product()]))
  const fetchImpl = makeFetch({ productResponses: [jsonResponse({}, 429, { 'retry-after': '1' }), ok] })
  const result = await syncUnitexCatalog({
    dryRun: true, configPath: workspace.configPath, storageDir: workspace.directory,
    env: { UNITEX_API_TOKEN: 'test-token', UNITEX_SYNC_TIMEOUT_MS: '30000' }, fetchImpl,
    sleepFn: async milliseconds => { sleeps.push(milliseconds) }, testMinIntervalMs: 0,
  })
  assert.equal(result.variantCount, 1)
  assert.ok(sleeps.some(milliseconds => milliseconds >= 5_500))
})

test('retries transient HTTP 500 responses', async () => {
  const workspace = await makeWorkspace({ allowedVariantIds: ['101'] })
  const fetchImpl = makeFetch({
    productResponses: [jsonResponse({}, 500), jsonResponse(productsEnvelope([product()]))],
  })
  const result = await syncUnitexCatalog({
    dryRun: true,
    configPath: workspace.configPath,
    storageDir: workspace.directory,
    env: { UNITEX_API_TOKEN: 'test-token', UNITEX_SYNC_TIMEOUT_MS: '30000' },
    fetchImpl,
    sleepFn: async () => {},
    testMinIntervalMs: 0,
  })
  assert.equal(result.variantCount, 1)
})

test('waits at least 5.5 seconds between ordinary API requests', async () => {
  let clock = 1_000
  const sleeps = []
  const request = createUnitexClient({
    token: 'test-token',
    apiBaseUrl: 'http://127.0.0.1/',
    fetchImpl: async () => jsonResponse({ data: {} }),
    sleepFn: async milliseconds => { sleeps.push(milliseconds); clock += milliseconds },
    now: () => clock,
  })
  await request('series')
  await request('products')
  assert.deepEqual(sleeps, [5_500])
})

test('requests product details in batches of no more than 55 records', async () => {
  const ids = Array.from({ length: 56 }, (_, index) => String(index + 1))
  const batchSizes = []
  const fetchImpl = async (url) => {
    if (url.pathname.includes('/series/')) return jsonResponse(seriesEnvelope(ids))
    const requestedIds = url.searchParams.get('ids').split(',')
    batchSizes.push(requestedIds.length)
    return jsonResponse(productsEnvelope(requestedIds.map(id => product({ id, baseId: `base-${id}` }))))
  }
  const { result } = await run({ fetchImpl })
  assert.equal(result.variantCount, 56)
  assert.deepEqual(batchSizes, [55, 1])
})

test('re-requests series omitted from a mixed Unitex response', async () => {
  let seriesCalls = 0
  const urus = seriesEnvelope(['101']).data.urus
  const berlin = {
    ...seriesEnvelope(['102']).data.urus,
    id: 'berlin',
    title: 'Диван Берлин',
    title_short: 'Берлин',
    category: { id: 12, title: 'Диваны и кресла' },
  }
  const fetchImpl = async (url) => {
    if (url.pathname.includes('/series/')) {
      seriesCalls += 1
      return seriesCalls === 1
        ? jsonResponse({ data: { berlin } })
        : jsonResponse({ data: { urus } })
    }
    return jsonResponse(productsEnvelope([
      product({ id: '101', baseId: 'base-101' }),
      product({ id: '102', baseId: 'base-102', title: 'Диван' }),
    ]))
  }
  const { result } = await run({
    config: {
      allowedSeriesCodes: ['urus', 'berlin'],
      categoryByUnitexId: { 1: 'executive-offices', 12: 'sofas-and-armchairs' },
    },
    fetchImpl,
  })
  assert.equal(seriesCalls, 2)
  assert.equal(result.seriesCount, 2)
  assert.equal(result.variantCount, 2)
})

test('falls back to individual series requests when a grouped response contains no requested records', async () => {
  let seriesCalls = 0
  const urus = seriesEnvelope(['101']).data.urus
  const berlin = {
    ...seriesEnvelope(['102']).data.urus,
    id: 'berlin',
    title: 'Диван Берлин',
    title_short: 'Берлин',
    category: { id: 12, title: 'Диваны и кресла' },
  }
  const unrelated = { ...urus, id: 'city' }
  const fetchImpl = async (url) => {
    if (url.pathname.includes('/series/')) {
      seriesCalls += 1
      const ids = url.searchParams.get('ids')
      if (ids === 'urus') return jsonResponse({ data: { urus } })
      if (ids === 'berlin') return jsonResponse({ data: { berlin } })
      return jsonResponse({ data: { city: unrelated } })
    }
    return jsonResponse(productsEnvelope([
      product({ id: '101', baseId: 'base-101' }),
      product({ id: '102', baseId: 'base-102', title: 'Диван' }),
    ]))
  }
  const { result } = await run({
    config: {
      allowedSeriesCodes: ['urus', 'berlin'],
      categoryByUnitexId: { 1: 'executive-offices', 12: 'sofas-and-armchairs' },
    },
    fetchImpl,
  })
  assert.equal(seriesCalls, 3)
  assert.equal(result.seriesCount, 2)
  assert.equal(result.variantCount, 2)
})

test('adds a prominent warning when token expires in less than one day', async () => {
  const fetchImpl = makeFetch({
    series: seriesEnvelope(['101'], '2026-01-01 14:00:00'),
    products: [product()],
    productsTokenTill: '2026-01-01 14:00:00',
  })
  const { result } = await run({ config: { allowedVariantIds: ['101'] }, fetchImpl })
  assert.ok(result.warnings.some(warning => warning.includes('менее чем через сутки')))
})

test('rejects an already expired token before publishing', async () => {
  const workspace = await makeWorkspace({ allowedVariantIds: ['101'] })
  const fetchImpl = makeFetch({
    series: seriesEnvelope(['101'], '2025-12-31 10:00:00'),
    products: [product()],
    productsTokenTill: '2025-12-31 10:00:00',
  })
  await assert.rejects(syncUnitexCatalog({
    configPath: workspace.configPath, storageDir: workspace.directory,
    env: { UNITEX_API_TOKEN: 'test-token', UNITEX_SYNC_TIMEOUT_MS: '30000' }, fetchImpl,
    sleepFn: async () => {}, testMinIntervalMs: 0, now: () => fixedNow,
  }), /токена Unitex истёк/)
  await assert.rejects(readFile(resolve(workspace.directory, 'unitexCatalog.json')), error => error.code === 'ENOENT')
})

test('skips a corrupted record while preserving valid products', async () => {
  const corrupted = { ...product({ id: '102', baseId: '501' }), art: '' }
  const { result } = await run({ fetchImpl: makeFetch({ products: [product(), corrupted] }) })
  assert.equal(result.variantCount, 1)
  assert.ok(result.warnings.some(warning => warning.includes('повреждённый вариант 102')))
})

test('reports an allowed product that is absent from the series', async () => {
  const { result } = await run({ config: { allowedVariantIds: ['101', '404'] } })
  assert.deepEqual(result.missingAllowedProductIds, ['variant:404'])
})

test('publishes only records marked as Unitex own production', async () => {
  const fetchImpl = async (url) => {
    if (url.pathname.includes('/series/')) return jsonResponse(seriesEnvelope(['101', '102']))
    if (url.searchParams.get('list_value') === 'production_our') {
      return jsonResponse({ data: { 101: 1, 102: 0 }, token_till: { date: '2030-02-01 12:00:00' } })
    }
    return jsonResponse(productsEnvelope([product({ id: '101' })]))
  }
  const { result } = await run({ config: { productionOurOnly: true }, fetchImpl })
  assert.equal(result.variantCount, 1)
  assert.equal(result.snapshot.products[0].variants[0].id, 'unitex-variant-101')
  assert.equal(result.snapshot.products[0].specifications.Производитель, 'Юнитекс')
})

test('keeps an own-production record without an article using a stable fallback', async () => {
  const withoutArticle = { ...product({ id: '101' }), art: '', base_art: '' }
  const fetchImpl = async (url) => {
    if (url.pathname.includes('/series/')) return jsonResponse(seriesEnvelope(['101']))
    if (url.searchParams.get('list_value') === 'production_our') {
      return jsonResponse({ data: { 101: 1 }, token_till: { date: '2030-02-01 12:00:00' } })
    }
    return jsonResponse(productsEnvelope([withoutArticle]))
  }
  const { result } = await run({ config: { productionOurOnly: true }, fetchImpl })
  assert.equal(result.variantCount, 1)
  assert.equal(result.snapshot.products[0].variants[0].article, 'UNITEX-101')
  assert.ok(result.warnings.some(warning => warning.includes('служебный артикул UNITEX-101')))
})

test('loads an allowed Unitex set and gives it precedence over series membership', async () => {
  const fetchImpl = async (url) => {
    if (url.pathname.includes('/series/')) return jsonResponse(seriesEnvelope(['101']))
    if (url.pathname.includes('/sets/')) {
      return jsonResponse({ data: {
        ds_skladnye_stoly: {
          ...seriesEnvelope(['101']).data.urus,
          id: 'ds_skladnye_stoly',
          title: 'Складные столы',
          title_short: 'Складные столы',
        },
      } })
    }
    if (url.searchParams.get('list_value') === 'production_our') return jsonResponse({ data: { 101: 1 } })
    return jsonResponse(productsEnvelope([product({ id: '101' })]))
  }
  const { result } = await run({
    config: { productionOurOnly: true, allowedSetCodes: ['ds_skladnye_stoly'] },
    fetchImpl,
  })
  assert.equal(result.snapshot.collections.length, 2)
  assert.equal(result.snapshot.products[0].collectionId, 'ds_skladnye_stoly')
})

test('resolves a manual series by article prefix and still applies own-production filtering', async () => {
  const fetchImpl = async (url) => {
    if (url.searchParams.get('list_value') === 'art') {
      return jsonResponse({ data: { 201: 'Matrix/3c/cn1114', 202: 'Other/1' } })
    }
    if (url.searchParams.get('list_value') === 'production_our') {
      return jsonResponse({ data: { 201: 1, 202: 1 } })
    }
    if (url.pathname.includes('/products/')) {
      return jsonResponse(productsEnvelope([{ ...product({ id: '201', baseId: 'matrix-base' }), producer: null }]))
    }
    return jsonResponse({}, 404)
  }
  const { result } = await run({
    config: {
      allowedSeriesCodes: [],
      productionOurOnly: true,
      manualSeries: [{
        id: 'matrix',
        title: 'Матрикс',
        categoryId: '12',
        categoryTitle: 'Диваны и кресла',
        typeId: 'soft',
        articlePrefixes: ['Matrix/'],
        images: ['https://static.unitex.ru/series/matrix.jpg'],
      }],
      categoryByUnitexId: { 12: 'sofas-and-armchairs' },
    },
    fetchImpl,
  })
  assert.equal(result.variantCount, 1)
  assert.equal(result.snapshot.collections[0].id, 'matrix')
  assert.equal(result.snapshot.products[0].collectionId, 'matrix')
  assert.equal(result.snapshot.products[0].categoryId, 'sofas-and-armchairs')
  assert.equal(result.snapshot.products[0].specifications.Производитель, 'Юнитекс')
})

test('resolves a manual series from a required secondary series relationship', async () => {
  const related = {
    ...product({ id: '101', baseId: 'reception-base', title: 'Стойка ресепшен' }),
    series: { urus: { id: 'urus' }, 'reception-dinr': { id: 'reception-dinr' } },
  }
  const ordinary = {
    ...product({ id: '102', baseId: 'ordinary-base' }),
    series: { urus: { id: 'urus' } },
  }
  const fetchImpl = async (url) => {
    if (url.pathname.includes('/series/')) return jsonResponse(seriesEnvelope(['101', '102']))
    if (url.searchParams.get('list_value') === 'production_our') return jsonResponse({ data: { 101: 1, 102: 1 } })
    if (url.pathname.includes('/products/')) return jsonResponse(productsEnvelope([related, ordinary]))
    return jsonResponse({}, 404)
  }
  const { result } = await run({
    config: {
      productionOurOnly: true,
      manualSeries: [{
        id: 'reception-dinr',
        title: 'Дин-Р',
        categoryId: '20',
        categoryTitle: 'Стойки ресепшен',
        sourceSeriesCode: 'urus',
        requiredSeriesCode: 'reception-dinr',
        images: ['https://static.unitex.ru/series/reception-dinr.jpg'],
      }],
      categoryByUnitexId: { 1: 'executive-offices', 20: 'reception-desks' },
    },
    fetchImpl,
  })
  const receptionProduct = result.snapshot.products.find(item => item.collectionId === 'reception-dinr')
  assert.ok(receptionProduct)
  assert.equal(receptionProduct.variants.length, 1)
  assert.equal(receptionProduct.categoryId, 'reception-desks')
})

test('prevents two synchronization processes from running concurrently', async () => {
  const workspace = await makeWorkspace({ allowedVariantIds: ['101'] })
  let releaseRequest
  let requestStarted
  const started = new Promise(resolvePromise => { requestStarted = resolvePromise })
  const blocked = new Promise(resolvePromise => { releaseRequest = resolvePromise })
  const fetchImpl = async (url) => {
    if (url.pathname.includes('/series/')) {
      requestStarted()
      await blocked
      return jsonResponse(seriesEnvelope(['101']))
    }
    return jsonResponse(productsEnvelope([product()]))
  }
  const first = syncUnitexCatalog({
    dryRun: true, configPath: workspace.configPath, storageDir: workspace.directory,
    env: { UNITEX_API_TOKEN: 'test-token', UNITEX_SYNC_TIMEOUT_MS: '30000' }, fetchImpl,
    sleepFn: async () => {}, testMinIntervalMs: 0,
  })
  await started
  await assert.rejects(syncUnitexCatalog({
    dryRun: true, configPath: workspace.configPath, storageDir: workspace.directory,
    env: { UNITEX_API_TOKEN: 'test-token', UNITEX_SYNC_TIMEOUT_MS: '30000' }, fetchImpl: makeFetch(),
    sleepFn: async () => {}, testMinIntervalMs: 0,
  }), /уже выполняется/)
  releaseRequest()
  await first
})

test('keeps the previous working catalog when a later sync fails', async () => {
  const workspace = await makeWorkspace()
  await syncUnitexCatalog({
    configPath: workspace.configPath, storageDir: workspace.directory,
    env: { UNITEX_API_TOKEN: 'test-token', UNITEX_SYNC_TIMEOUT_MS: '30000' }, fetchImpl: makeFetch(),
    sleepFn: async () => {}, testMinIntervalMs: 0,
  })
  const before = await readFile(resolve(workspace.directory, 'unitexCatalog.json'), 'utf8')
  await assert.rejects(syncUnitexCatalog({
    configPath: workspace.configPath, storageDir: workspace.directory,
    env: { UNITEX_API_TOKEN: 'test-token', UNITEX_SYNC_TIMEOUT_MS: '30000' }, fetchImpl: makeFetch({ products: [] }),
    sleepFn: async () => {}, testMinIntervalMs: 0,
  }))
  const after = await readFile(resolve(workspace.directory, 'unitexCatalog.json'), 'utf8')
  assert.equal(after, before)
})
