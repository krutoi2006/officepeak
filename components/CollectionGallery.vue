<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import type { CatalogImage } from '~/types/catalog'

const props = defineProps<{
  images: CatalogImage[]
}>()

const rail = ref<HTMLElement | null>(null)
const activeIndex = ref(0)
let scrollFrame: number | undefined
let resizeObserver: ResizeObserver | undefined

const showImage = (index: number, behavior: ScrollBehavior = 'smooth') => {
  const element = rail.value
  const count = props.images.length
  if (!element || !count) return

  const nextIndex = (index + count) % count
  activeIndex.value = nextIndex
  element.scrollTo({ left: nextIndex * element.clientWidth, behavior })
}

const updateActiveImage = () => {
  const element = rail.value
  if (!element?.clientWidth) return
  activeIndex.value = Math.min(
    props.images.length - 1,
    Math.max(0, Math.round(element.scrollLeft / element.clientWidth)),
  )
}

const handleScroll = () => {
  if (scrollFrame) cancelAnimationFrame(scrollFrame)
  scrollFrame = requestAnimationFrame(updateActiveImage)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    showImage(activeIndex.value - 1)
  }
  if (event.key === 'ArrowRight') {
    event.preventDefault()
    showImage(activeIndex.value + 1)
  }
}

onMounted(() => {
  resizeObserver = new ResizeObserver(() => showImage(activeIndex.value, 'auto'))
  if (rail.value) resizeObserver.observe(rail.value)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  if (scrollFrame) cancelAnimationFrame(scrollFrame)
})
</script>

<template>
  <div v-if="images.length" class="relative">
    <div
      ref="rail"
      class="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth bg-surface [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      tabindex="0"
      aria-label="Фотографии коллекции"
      @scroll.passive="handleScroll"
      @keydown="handleKeydown"
    >
      <figure
        v-for="(item, index) in images"
        :key="`${item.src}-${index}`"
        class="flex aspect-[4/3] min-w-full snap-center items-center justify-center sm:aspect-[16/9] lg:aspect-[16/7]"
      >
        <img
          :src="item.src"
          :alt="item.alt"
          :loading="index === 0 ? 'eager' : 'lazy'"
          class="h-full w-full object-contain p-3 sm:p-6"
        >
      </figure>
    </div>

    <template v-if="images.length > 1">
      <button
        type="button"
        class="icon-button absolute left-3 top-1/2 -translate-y-1/2 bg-white/95 shadow-sm sm:left-5"
        aria-label="Предыдущее изображение"
        @click="showImage(activeIndex - 1)"
      >
        <ChevronLeft class="h-5 w-5" />
      </button>
      <button
        type="button"
        class="icon-button absolute right-3 top-1/2 -translate-y-1/2 bg-white/95 shadow-sm sm:right-5"
        aria-label="Следующее изображение"
        @click="showImage(activeIndex + 1)"
      >
        <ChevronRight class="h-5 w-5" />
      </button>

      <div class="absolute bottom-4 left-1/2 flex max-w-[70%] -translate-x-1/2 items-center gap-2 rounded-full bg-white/90 px-3 py-2 shadow-sm">
        <button
          v-for="(_, index) in images"
          :key="index"
          type="button"
          class="h-2 w-2 shrink-0 rounded-full transition"
          :class="index === activeIndex ? 'bg-primary' : 'bg-primary/30 hover:bg-primary/60'"
          :aria-label="`Показать фотографию ${index + 1} из ${images.length}`"
          :aria-current="index === activeIndex ? 'true' : undefined"
          @click="showImage(index)"
        />
      </div>
    </template>
  </div>
</template>
