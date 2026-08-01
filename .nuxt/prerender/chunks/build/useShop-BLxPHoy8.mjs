globalThis.__timing__.logStart('Load chunks/build/useShop-BLxPHoy8');import { computed, toRef, isRef } from 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/vue/index.mjs';
import { b as useNuxtApp } from './server.mjs';

const categories = [
  { id: "executive-offices", name: "\u041A\u0430\u0431\u0438\u043D\u0435\u0442\u044B \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u0435\u0439", slug: "executive-offices", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=85" },
  { id: "staff-furniture", name: "\u041C\u0435\u0431\u0435\u043B\u044C \u0434\u043B\u044F \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u0430", slug: "staff-furniture", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85" },
  { id: "meeting-areas", name: "\u0417\u043E\u043D\u044B \u0434\u043B\u044F \u043F\u0435\u0440\u0435\u0433\u043E\u0432\u043E\u0440\u043E\u0432", slug: "meeting-areas", image: "https://images.unsplash.com/photo-1572025442646-866d16c84a54?auto=format&fit=crop&w=1200&q=85" },
  { id: "reception-desks", name: "\u0421\u0442\u043E\u0439\u043A\u0438 \u0440\u0435\u0441\u0435\u043F\u0448\u043D", slug: "reception-desks", image: "https://images.unsplash.com/photo-1497215848147-75b22b07e600?auto=format&fit=crop&w=1200&q=85" },
  { id: "chairs", name: "\u041A\u0440\u0435\u0441\u043B\u0430 \u0438 \u0441\u0442\u0443\u043B\u044C\u044F", slug: "chairs", image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=1200&q=85" },
  { id: "acoustic-solutions", name: "\u0410\u043A\u0443\u0441\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u044F", slug: "acoustic-solutions", image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85" }
];
const products = [
  { id: "1", name: "\u0420\u0430\u0431\u043E\u0447\u0438\u0439 \u0441\u0442\u043E\u043B X-Line \u0441 \u043A\u0430\u0431\u0435\u043B\u044C-\u043A\u0430\u043D\u0430\u043B\u043E\u043C", article: "XL-203", categoryId: "staff-furniture", price: 45e3, image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=85", isNew: true, inStock: true, colors: ["\u0411\u0435\u043B\u044B\u0439", "\u0414\u0443\u0431 \u0421\u043E\u043D\u043E\u043C\u0430", "\u0410\u043D\u0442\u0440\u0430\u0446\u0438\u0442"] },
  { id: "2", name: "\u042D\u0440\u0433\u043E\u043D\u043E\u043C\u0438\u0447\u043D\u043E\u0435 \u043A\u0440\u0435\u0441\u043B\u043E \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044F ErgoPro", article: "EP-100", categoryId: "chairs", price: 68e3, oldPrice: 75e3, image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=1000&q=85", isNew: false, inStock: true, colors: ["\u0427\u0435\u0440\u043D\u044B\u0439", "\u0421\u0435\u0440\u044B\u0439"] },
  { id: "3", name: "\u0421\u0442\u043E\u043B \u0434\u043B\u044F \u043F\u0435\u0440\u0435\u0433\u043E\u0432\u043E\u0440\u043E\u0432 Round D1200", article: "MR-05", categoryId: "meeting-areas", price: 12e4, image: "https://images.unsplash.com/photo-1572025442646-866d16c84a54?auto=format&fit=crop&w=1000&q=85", isNew: false, inStock: false, colors: ["\u041E\u0440\u0435\u0445", "\u0414\u0443\u0431"] },
  { id: "4", name: "\u0410\u043A\u0443\u0441\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043A\u0430\u0431\u0438\u043D\u0430 Silence", article: "AC-01", categoryId: "acoustic-solutions", price: 45e4, image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=85", isNew: true, inStock: true, colors: ["\u0421\u0435\u0440\u044B\u0439 \u043C\u0435\u043B\u0430\u043D\u0436", "\u0413\u0440\u0430\u0444\u0438\u0442"] },
  { id: "5", name: "\u041C\u043E\u0434\u0443\u043B\u044C\u043D\u0430\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F Grid", article: "ST-M", categoryId: "staff-furniture", price: 35e3, image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1000&q=85", isNew: false, inStock: true, colors: ["\u0411\u0435\u043B\u044B\u0439"] },
  { id: "6", name: "\u0421\u0442\u043E\u0439\u043A\u0430 \u0440\u0435\u0441\u0435\u043F\u0448\u043D WoodLine", article: "RC-W", categoryId: "reception-desks", price: 185e3, image: "https://images.unsplash.com/photo-1497215848147-75b22b07e600?auto=format&fit=crop&w=1000&q=85", isNew: false, inStock: true, colors: ["\u0414\u0443\u0431 \u043D\u0430\u0442\u0443\u0440\u0430\u043B\u044C\u043D\u044B\u0439"] },
  { id: "7", name: "\u041A\u043E\u043C\u043F\u043B\u0435\u043A\u0442 \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044F Ego", article: "EX-E", categoryId: "executive-offices", price: 32e4, image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=85", isNew: true, inStock: true, colors: ["\u0422\u0435\u043C\u043D\u044B\u0439 \u043E\u0440\u0435\u0445"] },
  { id: "8", name: "\u0421\u0442\u043E\u043B \u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u0440\u0435\u0433\u0443\u043B\u0438\u0440\u043E\u0432\u043A\u043E\u0439 Up&Down", article: "UD-01", categoryId: "staff-furniture", price: 55e3, oldPrice: 62e3, image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=85", isNew: false, inStock: true, colors: ["\u0411\u0435\u043B\u044B\u0439 / \u0421\u0435\u0440\u0435\u0431\u0440\u043E", "\u0427\u0435\u0440\u043D\u044B\u0439"] }
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
    var _a;
    const selectedColor = (_a = color != null ? color : product.colors[0]) != null ? _a : "";
    const found = cart.value.find((item) => item.id === product.id && item.selectedColor === selectedColor);
    found ? found.quantity += quantity : cart.value.push({ ...product, quantity, selectedColor });
    cartOpen.value = true;
  };
  const remove = (id, color) => cart.value = cart.value.filter((item) => item.id !== id || item.selectedColor !== color);
  const toggleFavorite = (id) => favorites.value = favorites.value.includes(id) ? favorites.value.filter((x) => x !== id) : [...favorites.value, id];
  return { cart, favorites, cartOpen, menuOpen, count, total, add, remove, toggleFavorite };
};

export { categories as c, formatPrice as f, products as p, useShop as u };;globalThis.__timing__.logEnd('Load chunks/build/useShop-BLxPHoy8');
//# sourceMappingURL=useShop-BLxPHoy8.mjs.map
