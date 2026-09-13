import { newArrivalCollectionIds } from '~/config/new-arrivals'
import { loadCatalogState } from '~/server/utils/catalogRepository'
import { toCollectionCard, toProductCard } from '~/server/utils/catalogProjection'

const newProductScore = (name: string) => {
  const normalized = name.toLocaleLowerCase('ru-RU')
  const accessoryPenalty = /кабель|каркас|опор|заглуш|крепеж|розет|провод/.test(normalized) ? 1_000 : 0
  const furniturePenalty = /стол|диван|кресл|шкаф|тумб|стойк|кабин|перегород/.test(normalized) ? 0 : 500
  const damagedEndingPenalty = /[-*]\s*$/.test(name) ? 200 : 0
  return accessoryPenalty + furniturePenalty + damagedEndingPenalty + name.length
}

export default defineEventHandler(async () => {
  const { snapshot } = await loadCatalogState()
  const configured = newArrivalCollectionIds.flatMap((collectionId) => {
    const candidates = snapshot.products
      .filter(product => product.collectionId === collectionId)
      .sort((left, right) => newProductScore(left.name) - newProductScore(right.name))
    return candidates[0] ?? []
  })
  const configuredIds = new Set(configured.map(product => product.id))
  const fallback = snapshot.products.filter(product => (
    (product.isRecommended || product.isNew) && !configuredIds.has(product.id)
  ))

  return {
    featuredCollections: snapshot.collections.filter(item => item.isFeatured).slice(0, 4).map(toCollectionCard),
    products: [...configured, ...fallback].slice(0, 8).map(product => toProductCard({
      ...product,
      name: product.name.replace(/[-*]+\s*$/g, '').trim(),
      isNew: true,
    })),
  }
})
