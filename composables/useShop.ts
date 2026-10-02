import type { CartLine, Product, ProductListResponse, ProductVariant, ResolvedCartItem } from '~/types/catalog'
import { isOrderablePrice } from '~/data/catalog'

const clampQuantity = (quantity: number) => Math.max(1, Math.min(999, Math.round(quantity || 1)))
const CART_COOKIE_MAX_AGE = 60 * 60 * 24 * 90
const FAVORITES_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

const normalizeCart = (value: unknown): CartLine[] => {
  if (!Array.isArray(value)) return []

  const uniqueLines = new Map<string, CartLine>()
  for (const rawLine of value) {
    if (!rawLine || typeof rawLine !== 'object' || Array.isArray(rawLine)) continue
    const line = rawLine as Record<string, unknown>
    const productId = typeof line.productId === 'string' ? line.productId.trim() : ''
    const variantId = typeof line.variantId === 'string' ? line.variantId.trim() : ''
    if (!productId || !variantId) continue
    const quantity = clampQuantity(Number(line.quantity))
    uniqueLines.set(`${productId}:${variantId}`, { productId, variantId, quantity })
  }
  return [...uniqueLines.values()]
}

const normalizeFavorites = (value: unknown): string[] => Array.isArray(value)
  ? [...new Set(value.filter((id): id is string => typeof id === 'string').map(id => id.trim()).filter(Boolean))]
  : []

export const useShop = () => {
  const requestFetch = useCatalogRequest()
  const cart = useCookie<CartLine[]>('officepeak-cart', {
    default: () => [],
    maxAge: CART_COOKIE_MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secure: import.meta.env.PROD,
    watch: true,
  })
  const favorites = useCookie<string[]>('officepeak-favorites', {
    default: () => [],
    maxAge: FAVORITES_COOKIE_MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secure: import.meta.env.PROD,
    watch: true,
  })
  const normalizedCart = normalizeCart(cart.value)
  const normalizedFavorites = normalizeFavorites(favorites.value)
  if (JSON.stringify(cart.value) !== JSON.stringify(normalizedCart)) cart.value = normalizedCart
  if (JSON.stringify(favorites.value) !== JSON.stringify(normalizedFavorites)) favorites.value = normalizedFavorites
  const cartOpen = useState('cartOpen', () => false)
  const menuOpen = useState('menuOpen', () => false)
  const productCache = useState<Record<string, Product>>('shop-product-cache', () => ({}))
  const registerProducts = (products: Product[]) => {
    if (!products.length) return
    productCache.value = { ...productCache.value, ...Object.fromEntries(products.map(product => [product.id, product])) }
  }
  const registerProduct = (product: Product) => registerProducts([product])
  const hydrateCart = async () => {
    const ids = [...new Set(cart.value.map(line => line.productId).filter(id => !productCache.value[id]))]
    if (!ids.length) return
    const response = await requestFetch<ProductListResponse>('/api/catalog/product-list', {
      query: { ids: ids.slice(0, 100).join(','), limit: Math.min(100, ids.length), full: 1 },
    })
    registerProducts(response.items)
  }
  const items = computed<ResolvedCartItem[]>(() => cart.value.flatMap((line) => {
    const product = productCache.value[line.productId]
    const variant = product?.variants.find(item => item.id === line.variantId)
    if (!product || !variant) return []
    return [{ ...line, key: `${line.productId}:${line.variantId}`, product, variant, lineTotal: variant.price * line.quantity }]
  }))
  const count = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const total = computed(() => items.value.reduce((sum, item) => sum + item.lineTotal, 0))
  const add = (product: Product, quantity = 1, variantOrId?: ProductVariant | string) => {
    registerProduct(product)
    const variantId = typeof variantOrId === 'string' ? variantOrId : variantOrId?.id
    const variant = product.variants.find(item => item.id === variantId) ?? product.variants[0]
    if (!variant || !isOrderablePrice(variant.price)) return
    const existing = cart.value.find(item => item.productId === product.id && item.variantId === variant.id)
    cart.value = existing
      ? cart.value.map(item => item === existing ? { ...item, quantity: clampQuantity(item.quantity + quantity) } : item)
      : [...cart.value, { productId: product.id, variantId: variant.id, quantity: clampQuantity(quantity) }]
    cartOpen.value = true
  }
  const setQuantity = (productId: string, variantId: string, quantity: number) => {
    cart.value = cart.value.map(item => item.productId === productId && item.variantId === variantId ? { ...item, quantity: clampQuantity(quantity) } : item)
  }
  const remove = (productId: string, variantId: string) => {
    cart.value = cart.value.filter(item => item.productId !== productId || item.variantId !== variantId)
  }
  const toggleFavorite = (id: string) => {
    favorites.value = favorites.value.includes(id) ? favorites.value.filter(item => item !== id) : [...favorites.value, id]
  }
  return { cart, items, favorites, cartOpen, menuOpen, count, total, add, setQuantity, remove, toggleFavorite, registerProduct, registerProducts, hydrateCart }
}
