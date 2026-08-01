import type { CartItem, Product } from '~/types/catalog'
export const useShop = () => {
  const cart = useState<CartItem[]>('cart', () => [])
  const favorites = useState<string[]>('favorites', () => [])
  const cartOpen = useState('cartOpen', () => false)
  const menuOpen = useState('menuOpen', () => false)
  const count = computed(() => cart.value.reduce((sum, item) => sum + item.quantity, 0))
  const total = computed(() => cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0))
  const add = (product: Product, quantity = 1, color?: string) => {
    const selectedColor = color ?? product.colors[0] ?? ''
    const found = cart.value.find(item => item.id === product.id && item.selectedColor === selectedColor)
    found ? found.quantity += quantity : cart.value.push({ ...product, quantity, selectedColor })
    cartOpen.value = true
  }
  const remove = (id: string, color: string) => cart.value = cart.value.filter(item => item.id !== id || item.selectedColor !== color)
  const toggleFavorite = (id: string) => favorites.value = favorites.value.includes(id) ? favorites.value.filter(x => x !== id) : [...favorites.value, id]
  return { cart, favorites, cartOpen, menuOpen, count, total, add, remove, toggleFavorite }
}
