import { loadCatalogState } from '~/server/utils/catalogRepository'
import { collectionById, collectionBySlug } from '~/data/catalog'

export default defineEventHandler(async (event) => {
  const { snapshot } = await loadCatalogState()
  const value = getRouterParam(event, 'slug') ?? ''
  const collection = collectionBySlug(snapshot, value) ?? collectionById(snapshot, value)
  if (!collection) throw createError({ statusCode: 404, message: 'Коллекция не найдена.' })
  return collection
})
