#!/usr/bin/env node
import { syncRivaCatalog } from './lib/riva-sync.mjs'

const args = new Set(process.argv.slice(2))
const unknown = [...args].filter(argument => argument !== '--dry-run')
if (unknown.length) {
  console.error(`[riva] Неизвестные аргументы: ${unknown.join(', ')}`)
  process.exit(2)
}

try {
  const result = await syncRivaCatalog({
    dryRun: args.has('--dry-run'),
    onProgress: (progress) => {
      if (progress.status === 'start') console.log(`[riva] Выгрузка ${progress.feed}/${progress.feeds}, type=${progress.type}: загрузка началась.`)
      if (progress.status === 'download') console.log(`[riva] type=${progress.type}: получено ${Math.round(progress.bytes / 1024 / 1024)} МБ.`)
      if (progress.status === 'complete') console.log(`[riva] type=${progress.type}: ${progress.offers} позиций, уникальных всего ${progress.uniqueOffers}.`)
    },
  })
  console.log(`[riva] ${result.dryRun ? 'Проверка завершена' : 'Синхронизация завершена'}: выгрузок ${result.feedCount}, товаров ${result.productCount}, вариантов ${result.variantCount}.`)
  if (result.duplicateOfferCount) console.log(`[riva] Удалено дублей между выгрузками: ${result.duplicateOfferCount}.`)
  for (const warning of result.warnings.slice(0, 100)) console.warn(`[riva] Предупреждение: ${warning}`)
  if (result.warnings.length > 100) console.warn(`[riva] Ещё предупреждений: ${result.warnings.length - 100}. Полный список записан в метаданные.`)
} catch (error) {
  const message = error instanceof Error ? error.message : 'Неизвестная ошибка'
  const safeMessage = message
    .replace(/([?&]id=)[^&\s]+/gi, '$1[REDACTED]')
    .replace(/[A-Za-z0-9_=-]{32,}/g, '[REDACTED]')
  console.error(`[riva] Синхронизация не выполнена: ${safeMessage}`)
  process.exit(1)
}
