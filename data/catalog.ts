import type { Category, Product } from '~/types/catalog'

export const categories: Category[] = [
  { id: 'executive-offices', name: 'Кабинеты руководителей', slug: 'executive-offices', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=85' },
  { id: 'staff-furniture', name: 'Мебель для персонала', slug: 'staff-furniture', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85' },
  { id: 'meeting-areas', name: 'Зоны для переговоров', slug: 'meeting-areas', image: 'https://images.unsplash.com/photo-1572025442646-866d16c84a54?auto=format&fit=crop&w=1200&q=85' },
  { id: 'reception-desks', name: 'Стойки ресепшн', slug: 'reception-desks', image: 'https://images.unsplash.com/photo-1497215848147-75b22b07e600?auto=format&fit=crop&w=1200&q=85' },
  { id: 'chairs', name: 'Кресла и стулья', slug: 'chairs', image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=1200&q=85' },
  { id: 'acoustic-solutions', name: 'Акустические решения', slug: 'acoustic-solutions', image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85' }
]

export const products: Product[] = [
  {id:'1',name:'Рабочий стол X-Line с кабель-каналом',article:'XL-203',categoryId:'staff-furniture',price:45000,image:'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=85',isNew:true,inStock:true,colors:['Белый','Дуб Сонома','Антрацит']},
  {id:'2',name:'Эргономичное кресло руководителя ErgoPro',article:'EP-100',categoryId:'chairs',price:68000,oldPrice:75000,image:'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=1000&q=85',isNew:false,inStock:true,colors:['Черный','Серый']},
  {id:'3',name:'Стол для переговоров Round D1200',article:'MR-05',categoryId:'meeting-areas',price:120000,image:'https://images.unsplash.com/photo-1572025442646-866d16c84a54?auto=format&fit=crop&w=1000&q=85',isNew:false,inStock:false,colors:['Орех','Дуб']},
  {id:'4',name:'Акустическая кабина Silence',article:'AC-01',categoryId:'acoustic-solutions',price:450000,image:'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=85',isNew:true,inStock:true,colors:['Серый меланж','Графит']},
  {id:'5',name:'Модульная система хранения Grid',article:'ST-M',categoryId:'staff-furniture',price:35000,image:'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1000&q=85',isNew:false,inStock:true,colors:['Белый']},
  {id:'6',name:'Стойка ресепшн WoodLine',article:'RC-W',categoryId:'reception-desks',price:185000,image:'https://images.unsplash.com/photo-1497215848147-75b22b07e600?auto=format&fit=crop&w=1000&q=85',isNew:false,inStock:true,colors:['Дуб натуральный']},
  {id:'7',name:'Комплект руководителя Ego',article:'EX-E',categoryId:'executive-offices',price:320000,image:'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=85',isNew:true,inStock:true,colors:['Темный орех']},
  {id:'8',name:'Стол с электрорегулировкой Up&Down',article:'UD-01',categoryId:'staff-furniture',price:55000,oldPrice:62000,image:'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=85',isNew:false,inStock:true,colors:['Белый / Серебро','Черный']}
]

export const formatPrice = (value: number) => new Intl.NumberFormat('ru-RU',{style:'currency',currency:'RUB',maximumFractionDigits:0}).format(value)
