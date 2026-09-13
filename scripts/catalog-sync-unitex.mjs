#!/usr/bin/env node
import { syncUnitexCatalog } from './lib/unitex-sync.mjs'

const args = new Set(process.argv.slice(2))
const unknown = [...args].filter(argument => argument !== '--dry-run')
if (unknown.length) {
  console.error(`[unitex] Неизвестные аргументы: ${unknown.join(', ')}`)
  process.exit(2)
}

try {
  let lastProgressBatch = -1
  const result = await syncUnitexCatalog({
    dryRun: args.has('--dry-run'),
    onProgress: (progress) => {
      if (progress.phase !== 'products') return
      if (progress.batch !== progress.batches && progress.batch !== 0 && progress.batch - lastProgressBatch < 10) return
      lastProgressBatch = progress.batch
      console.log(`[unitex] Загружено вариантов: ${progress.completed}/${progress.total} (пакет ${progress.batch}/${progress.batches}).`)
    },
  })
  console.log(`[unitex] ${result.dryRun ? 'Проверка завершена' : 'Синхронизация завершена'}: серий ${result.seriesCount}, товаров ${result.productCount}, вариантов ${result.variantCount}.`)
  if (result.missingAllowedProductIds.length) console.warn(`[unitex] Не найдены разрешённые позиции: ${result.missingAllowedProductIds.join(', ')}.`)
  for (const warning of result.warnings) console.warn(`[unitex] Предупреждение: ${warning}`)
} catch (error) {
  const message = error instanceof Error ? error.message : 'Неизвестная ошибка'
  const safeMessage = message
    .replace(/([?&]token=)[^&\s]+/gi, '$1[REDACTED]')
    .replace(/[A-Za-z0-9_=-]{32,}/g, '[REDACTED]')
  console.error(`[unitex] Синхронизация не выполнена: ${safeMessage}`)
  process.exit(1)
}
