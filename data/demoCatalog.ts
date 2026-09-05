import type {
  CatalogImage,
  CatalogSnapshot,
  Category,
  Collection,
  ColorOption,
  Product,
  ProductDimensions,
} from '~/types/catalog'
import { demoMedia } from '~/data/demoMedia'

const image = (src: string, alt: string): CatalogImage => ({ src, alt })
const color = (id: string, name: string, hex: string, material?: string): ColorOption => ({ id, name, hex, material })
const size = (width: number, depth: number, height: number): ProductDimensions => ({
  width,
  depth,
  height,
  label: `${width} × ${depth} × ${height} мм`,
})

const palette = {
  oak: color('oak', 'Дуб натуральный', '#B89466', 'ЛДСП'),
  lightOak: color('light-oak', 'Дуб светлый', '#D8C3A0', 'ЛДСП'),
  walnut: color('walnut', 'Орех', '#6D4935', 'Шпон'),
  graphite: color('graphite', 'Графит', '#4B4D4C', 'Порошковая окраска'),
  black: color('black', 'Чёрный', '#1D1D1D', 'Металл'),
  white: color('white', 'Белый', '#F0F0EC', 'ЛДСП'),
  grey: color('grey', 'Серый меланж', '#999B98', 'Ткань'),
  green: color('green', 'Хвойный зелёный', '#496459', 'Ткань'),
  blue: color('blue', 'Синий', '#485B78', 'Ткань'),
} as const

const subcategories = {
  chairs: [
    ['executive-chairs', 'Кресла для руководителя'],
    ['staff-chairs', 'Кресла для персонала'],
    ['meeting-chairs', 'Кресла для переговоров'],
    ['visitor-chairs', 'Стулья для посетителей'],
    ['bar-stools', 'Барные стулья'],
  ],
  waiting: [
    ['sofas-armchairs', 'Диваны и кресла'],
    ['poufs', 'Пуфы'],
    ['coffee-tables', 'Журнальные столы'],
    ['coat-racks', 'Вешалки'],
    ['multi-seat', 'Многоместные секции'],
    ['lounge-chairs', 'Лаунж-кресла'],
  ],
  kitchen: [
    ['mini-kitchens', 'Мини-кухни для офиса'],
    ['modular-kitchens', 'Модульные кухни'],
    ['custom-kitchens', 'Кухни на заказ'],
    ['dining-chairs', 'Обеденные стулья'],
    ['dining-tables', 'Обеденные столы'],
    ['bar-tables', 'Барные столы'],
  ],
  acoustic: [
    ['acoustic-booths', 'Акустические кабины'],
    ['acoustic-screens', 'Акустические экраны'],
    ['screen-dividers', 'Акустические экраны-перегородки'],
    ['acoustic-cabins', 'Акустические кабинки'],
    ['wall-panels', 'Настенные панели'],
    ['suspended-panels', 'Подвесные панели и конструкции'],
    ['floor-dividers', 'Напольные перегородки'],
    ['desk-screens', 'Настольные экраны'],
  ],
  metal: [
    ['safes', 'Сейфы'],
    ['racks', 'Стеллажи'],
    ['accounting-cabinets', 'Бухгалтерские шкафы'],
    ['office-cabinets', 'Шкафы для офиса'],
    ['locker-cabinets', 'Шкафы для раздевалок'],
    ['card-files', 'Картотеки'],
    ['metal-beds', 'Металлические кровати'],
    ['wardrobe-systems', 'Гардеробные системы'],
  ],
  project: [
    ['hotel-furniture', 'Мебель для гостиниц'],
    ['home-furniture', 'Мебель для дома'],
    ['courtroom-furniture', 'Судебная мебель'],
  ],
} as const

const makeSubs = (items: readonly (readonly [string, string])[] = []) =>
  items.map(([slug, name]) => ({ id: slug, slug, name }))

export const demoCategories: Category[] = [
  { id: 'executive-offices', slug: 'executive-offices', name: 'Кабинеты руководителя', description: 'Мебель для кабинета руководителя.', image: image(demoMedia.executive, 'Современный кабинет руководителя'), subcategories: [] },
  { id: 'staff-furniture', slug: 'staff-furniture', name: 'Мебель для персонала', description: 'Рабочие места для команды.', image: image(demoMedia.staff, 'Рабочее пространство для команды'), subcategories: [] },
  { id: 'meeting-areas', slug: 'meeting-areas', name: 'Зоны переговоров', description: 'Столы и кресла для встреч.', image: image(demoMedia.meeting, 'Переговорная комната'), subcategories: [] },
  { id: 'reception-desks', slug: 'reception-desks', name: 'Стойки ресепшн', description: 'Стойки для входной зоны.', image: image(demoMedia.reception, 'Стойка ресепшн в светлом офисе'), subcategories: [] },
  { id: 'chairs', slug: 'chairs', name: 'Кресла и стулья', description: 'Кресла и стулья для офиса.', image: image(demoMedia.chairs, 'Эргономичное офисное кресло'), subcategories: makeSubs(subcategories.chairs) },
  { id: 'waiting-areas', slug: 'waiting-areas', name: 'Зоны ожидания', description: 'Мягкая мебель для зон ожидания.', image: image(demoMedia.waiting, 'Мягкая мебель в зоне ожидания'), subcategories: makeSubs(subcategories.waiting) },
  { id: 'office-kitchens', slug: 'office-kitchens', name: 'Кухни для офиса', description: 'Готовые кухни для офиса.', image: image(demoMedia.kitchen, 'Современная офисная кухня'), subcategories: makeSubs(subcategories.kitchen) },
  { id: 'acoustic-solutions', slug: 'acoustic-solutions', name: 'Акустические решения', description: 'Кабины и панели для тишины.', image: image(demoMedia.acoustic, 'Акустическое решение для офиса'), subcategories: makeSubs(subcategories.acoustic) },
  { id: 'storage-systems', slug: 'storage-systems', name: 'Системы хранения', description: 'Шкафы, тумбы и стеллажи.', image: image(demoMedia.storage, 'Система хранения в офисе'), subcategories: [] },
  { id: 'adjustable-desks', slug: 'adjustable-desks', name: 'Регулируемые столы', description: 'Столы с настройкой высоты.', image: image(demoMedia.adjustable, 'Стол с регулировкой высоты'), subcategories: [] },
  { id: 'metal-furniture', slug: 'metal-furniture', name: 'Металлическая мебель', description: 'Шкафы, сейфы и стеллажи из металла.', image: image(demoMedia.metal, 'Металлический офисный стеллаж'), subcategories: makeSubs(subcategories.metal) },
  { id: 'project-furniture', slug: 'project-furniture', name: 'Проектная мебель', description: 'Мебель по вашему проекту.', image: image(demoMedia.project, 'Проектный интерьер общественного пространства'), subcategories: makeSubs(subcategories.project) },
]

export const demoCollections: Collection[] = [
  {
    id: 'axis', slug: 'axis', name: 'Axis', categoryId: 'executive-offices',
    description: 'Мебель для кабинета руководителя.',
    image: image(demoMedia.executive, 'Коллекция Axis в кабинете руководителя'),
    images: [image(demoMedia.executive, 'Кабинет Axis'), image(demoMedia.detail[1], 'Рабочая зона коллекции Axis')],
    colors: [palette.walnut, palette.graphite, palette.lightOak], priceFrom: 128000,
    groups: [{ id: 'desks', name: 'Рабочие столы', description: 'Основные и приставные столы.' }, { id: 'storage', name: 'Системы хранения', description: 'Тумбы и шкафы коллекции.' }],
    specifications: { Стиль: 'Современный', Основа: 'ЛДСП и металл', Назначение: 'Кабинет руководителя' }, relatedCollectionIds: ['rift'], isFeatured: true,
  },
  {
    id: 'rift', slug: 'rift', name: 'Rift', categoryId: 'staff-furniture',
    description: 'Рабочие места для одного человека или команды.',
    image: image(demoMedia.staff, 'Коллекция Rift для персонала'),
    images: [image(demoMedia.staff, 'Рабочие станции Rift'), image(demoMedia.detail[2], 'Командное пространство Rift')],
    colors: [palette.lightOak, palette.white, palette.graphite, palette.green], priceFrom: 46500,
    groups: [{ id: 'workstations', name: 'Рабочие станции', description: 'Одиночные и групповые рабочие места.' }, { id: 'screens', name: 'Экраны', description: 'Настольные акустические экраны.' }],
    specifications: { Конструкция: 'Модульная', Каркас: 'Сталь', Столешница: 'ЛДСП' }, relatedCollectionIds: ['axis', 'quiet'], isFeatured: true,
  },
  {
    id: 'forum', slug: 'forum', name: 'Forum', categoryId: 'meeting-areas',
    description: 'Столы для встреч и переговоров.',
    image: image(demoMedia.meeting, 'Переговорная коллекция Forum'),
    images: [image(demoMedia.meeting, 'Стол Forum в переговорной'), image(demoMedia.reception, 'Детали коллекции Forum')],
    colors: [palette.oak, palette.walnut, palette.black], priceFrom: 89000,
    groups: [{ id: 'meeting-tables', name: 'Переговорные столы', description: 'Столы разных форм и размеров.' }],
    specifications: { Назначение: 'Переговорные зоны', Форма: 'Прямоугольная или овальная' }, relatedCollectionIds: ['axis'], isFeatured: true,
  },
  {
    id: 'contour', slug: 'contour', name: 'Contour', categoryId: 'reception-desks',
    description: 'Стойки для входной зоны офиса.',
    image: image(demoMedia.reception, 'Стойка ресепшн Contour'),
    images: [image(demoMedia.reception, 'Коллекция Contour'), image(demoMedia.executive, 'Модули Contour')],
    colors: [palette.white, palette.lightOak, palette.graphite], priceFrom: 152000,
    groups: [{ id: 'reception-modules', name: 'Модули ресепшн', description: 'Прямые, угловые и завершающие элементы.' }],
    specifications: { Конструкция: 'Сборно-модульная', Материал: 'ЛДСП' }, relatedCollectionIds: ['rift'], isFeatured: false,
  },
  {
    id: 'quiet', slug: 'quiet', name: 'Quiet', categoryId: 'acoustic-solutions', subcategoryId: 'acoustic-booths',
    description: 'Кабины и экраны для тихой работы.',
    image: image(demoMedia.acoustic, 'Акустическая коллекция Quiet'),
    images: [image(demoMedia.acoustic, 'Акустическая кабина Quiet'), image(demoMedia.staff, 'Экран Quiet в офисе')],
    colors: [palette.grey, palette.green, palette.blue], priceFrom: 24500,
    groups: [{ id: 'booths', name: 'Кабины', description: 'Одноместные и переговорные кабины.' }, { id: 'screens', name: 'Экраны', description: 'Настольные и напольные экраны.' }],
    specifications: { Назначение: 'Контроль шума', Обивка: 'Акустическая ткань' }, relatedCollectionIds: ['rift'], isFeatured: true,
  },
  {
    id: 'vertex', slug: 'vertex', name: 'Vertex', categoryId: 'adjustable-desks',
    description: 'Столы с электрической настройкой высоты.',
    image: image(demoMedia.adjustable, 'Регулируемый стол Vertex'),
    images: [image(demoMedia.adjustable, 'Стол Vertex'), image(demoMedia.detail[0], 'Рабочее место Vertex')],
    colors: [palette.white, palette.oak, palette.black], priceFrom: 69000,
    groups: [{ id: 'adjustable-desks', name: 'Регулируемые столы', description: 'Столы для индивидуальных рабочих мест.' }],
    specifications: { Привод: 'Электрический', Управление: 'Кнопочная панель' }, relatedCollectionIds: ['rift'], isFeatured: true,
  },
]

type ProductSeed = {
  id: string
  name: string
  article: string
  categoryId: string
  image: string
  price: number
  collectionId?: string
  groupId?: string
  subcategoryId?: string
  availability?: 'in-stock' | 'on-order'
  oldPrice?: number
  isNew?: boolean
  recommended?: boolean
  colors?: ColorOption[]
  dimensions?: ProductDimensions
  description: string
}

const makeProduct = (seed: ProductSeed): Product => {
  const colors = seed.colors ?? [palette.oak, palette.graphite]
  const dimensions = seed.dimensions ?? size(1600, 800, 750)
  const images = [image(seed.image, seed.name), image(demoMedia.detail[1], `${seed.name}, вид в интерьере`), image(demoMedia.detail[2], `${seed.name}, деталь`)]
  return {
    id: seed.id,
    slug: seed.id,
    name: seed.name,
    categoryId: seed.categoryId,
    collectionId: seed.collectionId,
    groupId: seed.groupId,
    subcategoryId: seed.subcategoryId,
    description: seed.description,
    images,
    variants: colors.slice(0, 2).map((item, index) => ({
      id: `${seed.id}-${item.id}-${index + 1}`,
      article: `${seed.article}-${index + 1}`,
      color: item,
      dimensions: index === 0 ? dimensions : { ...dimensions, width: dimensions.width + 200, label: `${dimensions.width + 200} × ${dimensions.depth} × ${dimensions.height} мм` },
      price: seed.price + index * 7000,
      oldPrice: index === 0 ? seed.oldPrice : undefined,
      availability: index === 0 ? (seed.availability ?? 'in-stock') : 'on-order',
      stockQuantity: index === 0 && (seed.availability ?? 'in-stock') === 'in-stock' ? 8 : 0,
      imageIndex: index,
    })),
    specifications: { Назначение: demoCategories.find(item => item.id === seed.categoryId)?.name ?? 'Офис', Конструкция: 'Сборная', Производство: 'По проекту' },
    materials: ['ЛДСП класса E1', 'Металлическая фурнитура', colors[0]?.material ?? 'Комбинированные материалы'],
    warranty: 'Условия гарантии указаны в заказе.',
    features: ['Можно собрать комплект', 'Несколько цветов', 'Подходит для офиса'],
    isNew: Boolean(seed.isNew),
    isRecommended: Boolean(seed.recommended),
  }
}

export const demoProducts: Product[] = [
  makeProduct({ id: 'axis-director-desk', name: 'Стол руководителя Axis', article: 'AX-D', categoryId: 'executive-offices', collectionId: 'axis', groupId: 'desks', image: demoMedia.executive, price: 128000, oldPrice: 142000, colors: [palette.walnut, palette.lightOak], dimensions: size(2000, 900, 750), description: 'Стол руководителя с кабель-каналом.', isNew: true, recommended: true }),
  makeProduct({ id: 'axis-storage', name: 'Шкаф комбинированный Axis', article: 'AX-S', categoryId: 'executive-offices', collectionId: 'axis', groupId: 'storage', image: demoMedia.storage, price: 86000, colors: [palette.walnut, palette.graphite], dimensions: size(900, 450, 2100), description: 'Шкаф для документов и личных вещей.' }),
  makeProduct({ id: 'rift-workstation', name: 'Рабочая станция Rift', article: 'RF-W', categoryId: 'staff-furniture', collectionId: 'rift', groupId: 'workstations', image: demoMedia.staff, price: 46500, availability: 'on-order', colors: [palette.lightOak, palette.white], description: 'Рабочее место с металлическим каркасом.', isNew: true, recommended: true }),
  makeProduct({ id: 'forum-table', name: 'Переговорный стол Forum', article: 'FR-T', categoryId: 'meeting-areas', collectionId: 'forum', groupId: 'meeting-tables', image: demoMedia.meeting, price: 89000, colors: [palette.oak, palette.walnut], dimensions: size(2400, 1100, 750), description: 'Просторный стол для командных встреч и презентаций.', recommended: true }),
  makeProduct({ id: 'contour-reception', name: 'Стойка ресепшн Contour', article: 'CT-R', categoryId: 'reception-desks', collectionId: 'contour', groupId: 'reception-modules', image: demoMedia.reception, price: 152000, availability: 'on-order', colors: [palette.white, palette.lightOak], dimensions: size(2200, 850, 1150), description: 'Стойка для входной зоны.' }),
  makeProduct({ id: 'motion-chair', name: 'Кресло руководителя Motion', article: 'MO-C', categoryId: 'chairs', subcategoryId: 'executive-chairs', image: demoMedia.chairs, price: 68000, oldPrice: 75000, colors: [palette.black, palette.grey], dimensions: size(680, 680, 1220), description: 'Кресло с настройкой спинки и подлокотников.', recommended: true }),
  makeProduct({ id: 'soft-lounge', name: 'Лаунж-кресло Soft', article: 'SF-L', categoryId: 'waiting-areas', subcategoryId: 'lounge-chairs', image: demoMedia.waiting, price: 54000, colors: [palette.grey, palette.green], dimensions: size(820, 780, 840), description: 'Мягкое кресло для зон ожидания и неформальных встреч.', isNew: true }),
  makeProduct({ id: 'compact-kitchen', name: 'Мини-кухня Compact', article: 'CK-M', categoryId: 'office-kitchens', subcategoryId: 'mini-kitchens', image: demoMedia.kitchen, price: 198000, availability: 'on-order', colors: [palette.white, palette.lightOak], dimensions: size(1800, 650, 2200), description: 'Небольшая кухня для офиса.' }),
  makeProduct({ id: 'quiet-booth', name: 'Акустическая кабина Quiet One', article: 'QT-B', categoryId: 'acoustic-solutions', collectionId: 'quiet', groupId: 'booths', subcategoryId: 'acoustic-booths', image: demoMedia.acoustic, price: 450000, availability: 'on-order', colors: [palette.grey, palette.green], dimensions: size(1050, 1050, 2250), description: 'Одноместная кабина для звонков и сосредоточенной работы.', isNew: true, recommended: true }),
  makeProduct({ id: 'quiet-screen', name: 'Настольный экран Quiet', article: 'QT-S', categoryId: 'acoustic-solutions', collectionId: 'quiet', groupId: 'screens', subcategoryId: 'desk-screens', image: demoMedia.staff, price: 24500, colors: [palette.grey, palette.blue], dimensions: size(1400, 40, 450), description: 'Акустический экран для разделения рабочих мест.' }),
  makeProduct({ id: 'grid-cabinet', name: 'Шкаф Grid', article: 'GR-C', categoryId: 'storage-systems', image: demoMedia.storage, price: 59000, colors: [palette.lightOak, palette.graphite], dimensions: size(900, 450, 2100), description: 'Шкаф для документов и вещей.' }),
  makeProduct({ id: 'vertex-desk', name: 'Стол с электрорегулировкой Vertex', article: 'VX-D', categoryId: 'adjustable-desks', collectionId: 'vertex', groupId: 'adjustable-desks', image: demoMedia.adjustable, price: 69000, colors: [palette.white, palette.oak], dimensions: size(1400, 750, 1250), description: 'Стол с электрической настройкой высоты.', isNew: true }),
  makeProduct({ id: 'metal-safe', name: 'Офисный сейф Secure', article: 'SC-S', categoryId: 'metal-furniture', subcategoryId: 'safes', image: demoMedia.metal, price: 78000, colors: [palette.graphite, palette.black], dimensions: size(520, 480, 850), description: 'Металлический сейф для хранения документов и ценностей.' }),
  makeProduct({ id: 'hotel-console', name: 'Консоль Hotel Line', article: 'HL-C', categoryId: 'project-furniture', subcategoryId: 'hotel-furniture', image: demoMedia.project, price: 97000, availability: 'on-order', colors: [palette.walnut, palette.lightOak], dimensions: size(1600, 450, 820), description: 'Консоль для гостиниц и общественных зон.' }),
]

export const demoCatalog: CatalogSnapshot = {
  categories: demoCategories,
  collections: demoCollections,
  products: demoProducts,
}
