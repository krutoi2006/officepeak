import { readFile, stat } from 'node:fs/promises'
import { resolve } from 'node:path'
import { demoCatalog } from '~/data/demoCatalog'
import { assertCatalogSnapshot, mergeCatalogSnapshots, normalizeCatalog } from '~/services/catalogAdapter'
import type { CatalogOrigin, CatalogSnapshot, CatalogSource } from '~/types/catalog'

interface CachedCatalog {
  path: string
  signature: string
  source: CatalogOrigin
  snapshot: CatalogSnapshot
}

interface ProviderConfig {
  id: 'unitex' | 'riva'
  currentFile: string
  lastGoodFile: string
  currentSource: CatalogOrigin
  lastGoodSource: CatalogOrigin
  storageDir: string
}

export interface CatalogState {
  source: CatalogOrigin
  snapshot: CatalogSnapshot
}

const fileCache = new Map<string, CachedCatalog>()
const providerMemory = new Map<ProviderConfig['id'], CachedCatalog>()
const warningSignatures = new Set<string>()
const fallbackSnapshot = normalizeCatalog(demoCatalog)
let combinedCache: { signature: string, snapshot: CatalogSnapshot } | undefined

export const getCatalogStorageDir = () => resolve(process.env.UNITEX_CATALOG_STORAGE_DIR || resolve(process.cwd(), 'data', 'generated'))
export const getRivaCatalogStorageDir = () => resolve(process.env.RIVA_CATALOG_STORAGE_DIR || getCatalogStorageDir())

const readSnapshot = async (path: string, source: CatalogOrigin): Promise<CachedCatalog> => {
  const info = await stat(path)
  const signature = `${info.mtimeMs}:${info.size}`
  const cached = fileCache.get(path)
  if (cached?.signature === signature) return cached
  const value: unknown = JSON.parse(await readFile(path, 'utf8'))
  assertCatalogSnapshot(value)
  const result = { path, signature, source, snapshot: normalizeCatalog(value) }
  fileCache.set(path, result)
  return result
}

const warnOnce = (signature: string, message: string) => {
  if (warningSignatures.has(signature)) return
  warningSignatures.add(signature)
  console.warn(`[catalog] ${message}`)
}

const loadProvider = async (provider: ProviderConfig): Promise<CachedCatalog | undefined> => {
  const currentPath = resolve(provider.storageDir, provider.currentFile)
  try {
    const loaded = await readSnapshot(currentPath, provider.currentSource)
    providerMemory.set(provider.id, loaded)
    return loaded
  } catch (error: unknown) {
    const code = (error as NodeJS.ErrnoException)?.code
    const signature = `${currentPath}:${code ?? (error instanceof Error ? error.message : 'unknown')}`
    const memory = providerMemory.get(provider.id)
    if (memory?.source === provider.currentSource) {
      warnOnce(signature, `Рабочий снимок ${provider.id} недоступен или повреждён; используется ранее загруженная версия из памяти.`)
      return memory
    }
    if (code !== 'ENOENT') warnOnce(signature, `Рабочий снимок ${provider.id} недоступен или повреждён; выполняется безопасный откат.`)
  }

  const lastGoodPath = resolve(provider.storageDir, provider.lastGoodFile)
  try {
    const loaded = await readSnapshot(lastGoodPath, provider.lastGoodSource)
    providerMemory.set(provider.id, loaded)
    return loaded
  } catch (error: unknown) {
    const code = (error as NodeJS.ErrnoException)?.code
    if (code !== 'ENOENT') {
      const signature = `${lastGoodPath}:${error instanceof Error ? error.message : 'unknown'}`
      warnOnce(signature, `Резервный снимок ${provider.id} повреждён; этот поставщик временно исключён из каталога.`)
    }
  }
  return undefined
}

export const loadCatalogState = async (): Promise<CatalogState> => {
  const providers: ProviderConfig[] = [
    {
      id: 'unitex',
      currentFile: 'unitexCatalog.json',
      lastGoodFile: 'unitexCatalog.last-good.json',
      currentSource: 'unitex',
      lastGoodSource: 'unitex-last-good',
      storageDir: getCatalogStorageDir(),
    },
    {
      id: 'riva',
      currentFile: 'rivaCatalog.json',
      lastGoodFile: 'rivaCatalog.last-good.json',
      currentSource: 'riva',
      lastGoodSource: 'riva-last-good',
      storageDir: getRivaCatalogStorageDir(),
    },
  ]
  const loaded = (await Promise.all(providers.map(loadProvider))).filter((item): item is CachedCatalog => Boolean(item))
  const first = loaded[0]
  if (!first) return { source: 'demo', snapshot: fallbackSnapshot }
  if (loaded.length === 1) return { source: first.source, snapshot: first.snapshot }
  const signature = loaded.map(item => `${item.path}:${item.signature}`).join('|')
  if (combinedCache?.signature !== signature) {
    combinedCache = { signature, snapshot: mergeCatalogSnapshots(loaded.map(item => item.snapshot)) }
  }
  return { source: 'combined', snapshot: combinedCache.snapshot }
}

export class RuntimeCatalogSource implements CatalogSource {
  async load(): Promise<CatalogSnapshot> {
    const { snapshot } = await loadCatalogState()
    return normalizeCatalog(snapshot)
  }
}

export const clearCatalogCache = () => {
  fileCache.clear()
  providerMemory.clear()
  warningSignatures.clear()
  combinedCache = undefined
}
