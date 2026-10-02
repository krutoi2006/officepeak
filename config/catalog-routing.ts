export const collectionCategoryOverrides: Record<string, string> = {
  // Unitex: переговорные коллекции и столы с электрорегулировкой.
  speech: 'meeting-areas',
  speech_cube: 'meeting-areas',
  speech_presidium: 'meeting-areas',
  elevo: 'adjustable-desks',

  // Riva: коллекции, которые поставщик отдаёт внутри «Мебели для персонала».
  'riva-collection-3389': 'office-kitchens', // Фит
  'riva-collection-3437': 'acoustic-solutions', // Р-лайн
  'riva-collection-3439': 'acoustic-solutions', // Р-лайн софт
  'riva-collection-3509': 'metal-furniture', // Рива Металл

  // Явно фиксируем регулируемые серии Riva в нужном разделе.
  'riva-collection-5005': 'adjustable-desks', // Мув Ап
  'riva-collection-5008': 'adjustable-desks', // Мув Ап ПЛЮС
  'riva-collection-5011': 'adjustable-desks', // Мув Ап ПРО
  'riva-collection-5014': 'adjustable-desks', // Мув Ап УЛЬТРА
}

export const categoryConsolidation: Record<string, string> = {
  'sofas-and-armchairs': 'waiting-areas',
  'coffee-tables': 'waiting-areas',
  'lounge-furniture': 'waiting-areas',
  'hotel-furniture': 'project-furniture',
  'office-partitions': 'acoustic-solutions',
}

