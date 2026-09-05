export const siteConfig = {
  name: 'OFFICEPEAK',
  tagline: 'Функциональные решения для вашего офиса',
  siteUrl: 'https://officepeak.ru',
  phone: '+7 996-860-14-55',
  phoneHref: 'tel:+79968601455',
  email: 'OFFICEPEAK.1@yandex.ru',
  emailHref: 'mailto:OFFICEPEAK.1@yandex.ru',
  address: '',
  workingHours: '',
  social: { telegram: '', max: '' },
  companyDetails: { legalName: '', inn: '', ogrn: '' },
  forms: {
    acceptedFileExtensions: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.jpg', '.jpeg', '.png'],
    acceptedMimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/jpeg',
      'image/png',
    ],
    maxFileSizeBytes: 10 * 1024 * 1024,
    leadTransportUrl: '',
    mailTransportUrl: '',
    antispamProvider: '',
  },
} as const

export const publicOfferDisclaimer =
  'Сведения, размещённые на настоящем интернет-ресурсе, носят исключительно информационный характер и не являются публичной офертой (ст. 437 Гражданского кодекса РФ).'
