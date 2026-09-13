import { loadCatalogState } from '~/server/utils/catalogRepository'
import { productById } from '~/data/catalog'

export default defineEventHandler(async (event) => {
  const { snapshot } = await loadCatalogState()
  const product = productById(snapshot, getRouterParam(event, 'id') ?? '')
  if (!product) throw createError({ statusCode: 404, message: 'Товар не найден.' })
  return product
})
