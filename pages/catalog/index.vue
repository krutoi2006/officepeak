<script setup lang="ts">
import { Filter, Grid2X2, LayoutGrid, RotateCcw, X } from 'lucide-vue-next'
import { categories, collections, productStartingPrice, products } from '~/data/catalog'

const route = useRoute()
const router = useRouter()
const readQuery = (key: string) => String(route.query[key] ?? '')
const priceFloor = Math.floor(Math.min(...products.map(productStartingPrice)) / 1000) * 1000
const priceCeil = Math.ceil(Math.max(...products.flatMap(product => product.variants.map(variant => variant.price))) / 1000) * 1000
const minPrice = ref(Number(readQuery('min')) || priceFloor)
const maxPrice = ref(Number(readQuery('max')) || priceCeil)
const category = ref(readQuery('category'))
const subcategory = ref(readQuery('subcategory'))
const collection = ref(readQuery('collection'))
const availability = ref(readQuery('availability'))
const color = ref(readQuery('color'))
const sort = ref(readQuery('sort') || 'default')
const view = ref(readQuery('view') || 'grid')
const page = ref(Math.max(1, Number(readQuery('page')) || 1))
const filtersOpen = ref(false)
const perPage = 8

const allColors = products.flatMap(item => item.variants.map(variant => variant.color)).filter((item, index, list) => list.findIndex(candidate => candidate.id === item.id) === index)
const activeCategory = computed(() => categories.find(item => item.id === category.value))
const visibleSubcategories = computed(() => activeCategory.value?.subcategories ?? categories.flatMap(item => item.subcategories))
const visibleCollections = computed(() => category.value ? collections.filter(item => item.categoryId === category.value) : collections)

const filtered = computed(() => {
  const list = products.filter((product) => {
    const matchesPrice = product.variants.some(variant => variant.price >= minPrice.value && variant.price <= maxPrice.value)
    const matchesAvailability = !availability.value || product.variants.some(variant => variant.availability === availability.value)
    const matchesColor = !color.value || product.variants.some(variant => variant.color.id === color.value)
    return matchesPrice && matchesAvailability && matchesColor
      && (!category.value || product.categoryId === category.value)
      && (!subcategory.value || product.subcategoryId === subcategory.value)
      && (!collection.value || product.collectionId === collection.value)
  })
  return [...list].sort((a, b) => {
    if (sort.value === 'price-asc') return productStartingPrice(a) - productStartingPrice(b)
    if (sort.value === 'price-desc') return productStartingPrice(b) - productStartingPrice(a)
    if (sort.value === 'name') return a.name.localeCompare(b.name, 'ru')
    if (sort.value === 'new') return Number(b.isNew) - Number(a.isNew)
    return 0
  })
})
const visibleProducts = computed(() => filtered.value.slice(0, page.value * perPage))
const activeFilters = computed(() => [category.value, subcategory.value, collection.value, availability.value, color.value].filter(Boolean).length + Number(minPrice.value !== priceFloor || maxPrice.value !== priceCeil))

const syncQuery = () => {
  const query: Record<string, string> = {}
  if (minPrice.value !== priceFloor) query.min = String(minPrice.value)
  if (maxPrice.value !== priceCeil) query.max = String(maxPrice.value)
  if (category.value) query.category = category.value
  if (subcategory.value) query.subcategory = subcategory.value
  if (collection.value) query.collection = collection.value
  if (availability.value) query.availability = availability.value
  if (color.value) query.color = color.value
  if (sort.value !== 'default') query.sort = sort.value
  if (view.value !== 'grid') query.view = view.value
  if (page.value > 1) query.page = String(page.value)
  router.replace({ query })
}
watch([minPrice, maxPrice, category, subcategory, collection, availability, color, sort, view, page], syncQuery)
watch(category, () => { if (subcategory.value && !visibleSubcategories.value.some(item => item.id === subcategory.value)) subcategory.value = ''; if (collection.value && !visibleCollections.value.some(item => item.id === collection.value)) collection.value = ''; page.value = 1 })
watch([minPrice, maxPrice, subcategory, collection, availability, color, sort], () => { page.value = 1 })
const reset = () => { minPrice.value = priceFloor; maxPrice.value = priceCeil; category.value = ''; subcategory.value = ''; collection.value = ''; availability.value = ''; color.value = ''; sort.value = 'default'; page.value = 1 }

usePageSeo('Каталог офисной мебели', 'Категории, коллекции и товары OFFICEPEAK с фильтрами по цене, наличию, цвету и назначению.', '/catalog')
</script>

<template>
  <div class="container-page py-10 md:py-14">
    <Breadcrumbs :items="[{ label: 'Главная', to: '/' }, { label: 'Каталог' }]" />
    <div class="mb-12 grid gap-5 lg:grid-cols-[1fr_.8fr] lg:items-end"><div><h1 class="display-title">Каталог офисной мебели</h1></div><p class="max-w-2xl leading-7 text-secondary lg:justify-self-end">Мебель для рабочих мест, переговорных и других зон офиса.</p></div>

    <section aria-labelledby="catalog-categories" class="mb-16">
      <h2 id="catalog-categories" class="sr-only">Категории</h2>
      <div class="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <NuxtLink v-for="item in categories" :key="item.id" :to="`/catalog/${item.slug}`" class="group flex min-h-28 items-center gap-4 bg-white p-4 transition hover:bg-surface"><img :src="item.image.src" :alt="item.image.alt" loading="lazy" class="h-16 w-20 shrink-0 object-cover"><span class="text-sm font-medium leading-5 group-hover:text-accent">{{ item.name }}</span></NuxtLink>
      </div>
    </section>

    <section class="mb-16" aria-labelledby="collections-heading"><div class="mb-7 flex items-end justify-between"><div><h2 id="collections-heading" class="text-3xl font-light md:text-4xl">Серии мебели</h2></div></div><div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3"><CollectionCard v-for="item in collections.slice(0, 3)" :key="item.id" :collection="item" /></div></section>

    <section aria-labelledby="products-heading">
      <div class="mb-6 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
        <div><h2 id="products-heading" class="text-2xl font-light">Товары и модули</h2><p class="text-xs text-secondary">Найдено: {{ filtered.length }}</p></div>
        <div class="flex items-center gap-2"><button type="button" class="btn-secondary lg:hidden" @click="filtersOpen = true"><Filter class="h-4 w-4" /> Фильтры <span v-if="activeFilters">({{ activeFilters }})</span></button><label class="sr-only" for="sort">Сортировка</label><select id="sort" v-model="sort" class="h-11 border border-border bg-white px-3 text-sm"><option value="default">По умолчанию</option><option value="price-asc">Сначала дешевле</option><option value="price-desc">Сначала дороже</option><option value="name">По названию</option><option value="new">Сначала новинки</option></select><div class="hidden border border-border sm:flex"><button type="button" class="p-3" :class="view === 'grid' && 'bg-surface'" aria-label="Сетка по четыре" @click="view = 'grid'"><Grid2X2 class="h-4 w-4" /></button><button type="button" class="p-3" :class="view === 'wide' && 'bg-surface'" aria-label="Крупная сетка" @click="view = 'wide'"><LayoutGrid class="h-4 w-4" /></button></div></div>
      </div>
      <div class="grid gap-8 lg:grid-cols-[260px_1fr]">
        <div v-if="filtersOpen" class="fixed inset-0 z-40 bg-black/45 lg:hidden" aria-hidden="true" @click="filtersOpen = false" />
        <aside class="z-50 bg-white lg:static lg:z-auto lg:block" :class="filtersOpen ? 'fixed inset-y-0 left-0 w-[88%] max-w-sm overflow-y-auto p-6 shadow-2xl' : 'hidden'">
          <div class="mb-7 flex items-center justify-between"><h3 class="text-lg font-medium">Фильтры</h3><button type="button" class="icon-button lg:hidden" aria-label="Закрыть фильтры" @click="filtersOpen = false"><X class="h-4 w-4" /></button></div>
          <div class="space-y-7">
            <fieldset><legend class="mb-3 text-sm font-medium">Цена, ₽</legend><div class="grid grid-cols-2 gap-2"><label class="text-xs text-secondary">От<input v-model.number="minPrice" type="number" :min="priceFloor" :max="maxPrice" class="field-input"></label><label class="text-xs text-secondary">До<input v-model.number="maxPrice" type="number" :min="minPrice" :max="priceCeil" class="field-input"></label></div></fieldset>
            <label class="field-label">Категория<select v-model="category" class="field-input"><option value="">Все категории</option><option v-for="item in categories" :key="item.id" :value="item.id">{{ item.name }}</option></select></label>
            <label class="field-label">Подкатегория<select v-model="subcategory" class="field-input"><option value="">Все подкатегории</option><option v-for="item in visibleSubcategories" :key="item.id" :value="item.id">{{ item.name }}</option></select></label>
            <label class="field-label">Коллекция<select v-model="collection" class="field-input"><option value="">Все коллекции</option><option v-for="item in visibleCollections" :key="item.id" :value="item.id">{{ item.name }}</option></select></label>
            <fieldset><legend class="mb-3 text-sm font-medium">Наличие</legend><div class="space-y-2 text-sm"><label class="flex gap-2"><input v-model="availability" type="radio" value="">Все</label><label class="flex gap-2"><input v-model="availability" type="radio" value="in-stock">В наличии</label><label class="flex gap-2"><input v-model="availability" type="radio" value="on-order">Под заказ</label></div></fieldset>
            <label class="field-label">Цвет<select v-model="color" class="field-input"><option value="">Все цвета</option><option v-for="item in allColors" :key="item.id" :value="item.id">{{ item.name }}</option></select></label>
            <button type="button" class="btn-secondary w-full" @click="reset"><RotateCcw class="h-4 w-4" /> Сбросить</button>
          </div>
        </aside>
        <div>
          <div v-if="visibleProducts.length" class="grid gap-x-4 gap-y-12" :class="view === 'grid' ? 'sm:grid-cols-2 xl:grid-cols-3' : 'md:grid-cols-2'">
            <ProductCard v-for="product in visibleProducts" :key="product.id" :product="product" />
          </div>
          <div v-else class="flex min-h-72 flex-col items-center justify-center bg-surface p-8 text-center"><h3 class="mb-2 text-2xl font-light">Ничего не найдено</h3><p class="mb-6 max-w-md text-sm text-secondary">Измените или сбросьте фильтры.</p><button type="button" class="btn-primary" @click="reset">Сбросить фильтры</button></div>
          <div v-if="visibleProducts.length < filtered.length" class="mt-12 text-center"><button type="button" class="btn-secondary" @click="page += 1">Показать ещё</button></div>
        </div>
      </div>
    </section>
  </div>
</template>
