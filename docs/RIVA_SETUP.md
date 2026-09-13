# OFFICEPEAK: синхронизация Riva

Каталог Riva загружается серверной командой `npm run catalog:sync:riva`. Скрипт потоково разбирает XML и не сохраняет исходные выгрузки на диск. Товары Riva объединяются с опубликованным каталогом Unitex на стороне сервера.

## Настройка

Задайте переменные только в серверном окружении приложения и CRON:

```dotenv
RIVA_API_ID=<RIVA_API_ID>
RIVA_API_BASE_URL=https://riva.ru/api/
RIVA_CATALOG_STORAGE_DIR=<PERSISTENT_CATALOG_DIR>
RIVA_SYNC_TIMEOUT_MS=7200000
RIVA_SYNC_MAX_RETRIES=3
```

Если `RIVA_CATALOG_STORAGE_DIR` не задан, используется `UNITEX_CATALOG_STORAGE_DIR`. Секретный ID нельзя помещать в переменные `NUXT_PUBLIC_*` или клиентский код.

Выбранные выгрузки перечислены в `config/riva-sync.json`. В каталог включены переданные категории Riva; типы «Аксессуары» и «Мебель для суда» намеренно не выбраны. Повторяющиеся позиции из пересекающихся выгрузок удаляются по ID предложения Riva.

## Запуск

Проверка без публикации:

```bash
npm run catalog:sync:riva -- --dry-run
```

Публикация:

```bash
npm run catalog:sync:riva
```

Рабочий снимок записывается атомарно в `rivaCatalog.json`; предыдущая корректная версия сохраняется в `rivaCatalog.last-good.json`. Счётчики, предупреждения и SHA-256 находятся в `rivaCatalog.meta.json`.

Пример ежедневного CRON (подставьте реальные пути):

```cron
25 3 * * * cd <APPLICATION_DIR> && <PATH_TO_NPM> run catalog:sync:riva >> <LOG_DIR>/riva-sync.log 2>&1
```

После успешной записи сервер автоматически перечитает файлы. Если опубликованы оба поставщика, `/api/catalog` возвращает `source: "combined"`.
