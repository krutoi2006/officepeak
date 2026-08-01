import { toRef, isRef, computed } from "vue";
import { b as useNuxtApp } from "../server.mjs";
const categories = [
  { id: "executive-offices", name: "Кабинеты руководителей", slug: "executive-offices", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=85" },
  { id: "staff-furniture", name: "Мебель для персонала", slug: "staff-furniture", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85" },
  { id: "meeting-areas", name: "Зоны для переговоров", slug: "meeting-areas", image: "https://images.unsplash.com/photo-1572025442646-866d16c84a54?auto=format&fit=crop&w=1200&q=85" },
  { id: "reception-desks", name: "Стойки ресепшн", slug: "reception-desks", image: "https://images.unsplash.com/photo-1497215848147-75b22b07e600?auto=format&fit=crop&w=1200&q=85" },
  { id: "chairs", name: "Кресла и стулья", slug: "chairs", image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=1200&q=85" },
  { id: "acoustic-solutions", name: "Акустические решения", slug: "acoustic-solutions", image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85" }
];
const products = [
  { id: "1", name: "Рабочий стол X-Line с кабель-каналом", article: "XL-203", categoryId: "staff-furniture", price: 45e3, image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=85", isNew: true, inStock: true, colors: ["Белый", "Дуб Сонома", "Антрацит"] },
  { id: "2", name: "Эргономичное кресло руководителя ErgoPro", article: "EP-100", categoryId: "chairs", price: 68e3, oldPrice: 75e3, image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=1000&q=85", isNew: false, inStock: true, colors: ["Черный", "Серый"] },
  { id: "3", name: "Стол для переговоров Round D1200", article: "MR-05", categoryId: "meeting-areas", price: 12e4, image: "https://images.unsplash.com/photo-1572025442646-866d16c84a54?auto=format&fit=crop&w=1000&q=85", isNew: false, inStock: false, colors: ["Орех", "Дуб"] },
  { id: "4", name: "Акустическая кабина Silence", article: "AC-01", categoryId: "acoustic-solutions", price: 45e4, image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=85", isNew: true, inStock: true, colors: ["Серый меланж", "Графит"] },
  { id: "5", name: "Модульная система хранения Grid", article: "ST-M", categoryId: "staff-furniture", price: 35e3, image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1000&q=85", isNew: false, inStock: true, colors: ["Белый"] },
  { id: "6", name: "Стойка ресепшн WoodLine", article: "RC-W", categoryId: "reception-desks", price: 185e3, image: "https://images.unsplash.com/photo-1497215848147-75b22b07e600?auto=format&fit=crop&w=1000&q=85", isNew: false, inStock: true, colors: ["Дуб натуральный"] },
  { id: "7", name: "Комплект руководителя Ego", article: "EX-E", categoryId: "executive-offices", price: 32e4, image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=85", isNew: true, inStock: true, colors: ["Темный орех"] },
  { id: "8", name: "Стол с электрорегулировкой Up&Down", article: "UD-01", categoryId: "staff-furniture", price: 55e3, oldPrice: 62e3, image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=85", isNew: false, inStock: true, colors: ["Белый / Серебро", "Черный"] }
];
const formatPrice = (value) => new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(value);
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useShop = () => {
  const cart = useState("cart", () => []);
  const favorites = useState("favorites", () => []);
  const cartOpen = useState("cartOpen", () => false);
  const menuOpen = useState("menuOpen", () => false);
  const count = computed(() => cart.value.reduce((sum, item) => sum + item.quantity, 0));
  const total = computed(() => cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0));
  const add = (product, quantity = 1, color) => {
    const selectedColor = color ?? product.colors[0] ?? "";
    const found = cart.value.find((item) => item.id === product.id && item.selectedColor === selectedColor);
    found ? found.quantity += quantity : cart.value.push({ ...product, quantity, selectedColor });
    cartOpen.value = true;
  };
  const remove = (id, color) => cart.value = cart.value.filter((item) => item.id !== id || item.selectedColor !== color);
  const toggleFavorite = (id) => favorites.value = favorites.value.includes(id) ? favorites.value.filter((x) => x !== id) : [...favorites.value, id];
  return { cart, favorites, cartOpen, menuOpen, count, total, add, remove, toggleFavorite };
};
export {
  categories as c,
  formatPrice as f,
  products as p,
  useShop as u
};
//# sourceMappingURL=useShop-BLxPHoy8.js.map
