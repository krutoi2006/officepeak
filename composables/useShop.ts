import type { CartLine, Product, ProductVariant, ResolvedCartItem } from '~/types/catalog'
import { productById } from '~/data/catalog'

const clampQuantity = (quantity: number) => Math.max(1, Math.min(999, Math.round(quantity || 1)))

export const useShop = () => {
  const cart = useCookie<CartLine[]>('officepeak-cart', { default: () => [], maxAge: 60 * 60 * 24 * 90, sameSite: 'lax', watch: true })
  const favorites = useCookie<string[]>('officepeak-favorites', { default: () => [], maxAge: 60 * 60 * 24 * 365, sameSite: 'lax', watch: true })
  const cartOpen = useState('cartOpen', () => false)
  const menuOpen = useState('menuOpen', () => false)
  const items = computed<ResolvedCartItem[]>(() => cart.value.flatMap((line) => {
    const product = productById(line.productId)
    const variant = product?.variants.find(item => item.id === line.variantId)
    if (!product || !variant) return []
    return [{ ...line, key: `${line.productId}:${line.variantId}`, product, variant, lineTotal: variant.price * line.quantity }]
  }))
  const count = computed(() => cart.value.reduce((sum, item) => sum + item.quantity, 0))
  const total = computed(() => items.value.reduce((sum, item) => sum + item.lineTotal, 0))
  const add = (product: Product, quantity = 1, variantOrId?: ProductVariant | string) => {
    const variantId = typeof variantOrId === 'string' ? variantOrId : variantOrId?.id
    const variant = product.variants.find(item => item.id === variantId) ?? product.variants[0]
    if (!variant) return
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
  return { cart, items, favorites, cartOpen, menuOpen, count, total, add, setQuantity, remove, toggleFavorite }
}
