<script setup lang="ts">
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'
import type { ColorOption } from '~/types/catalog'

defineProps<{
  colors: ColorOption[]
}>()

const rail = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)
let resizeObserver: ResizeObserver | undefined

const updateScrollState = () => {
  const element = rail.value
  if (!element) return

  canScrollLeft.value = element.scrollLeft > 2
  canScrollRight.value = element.scrollLeft < element.scrollWidth - element.clientWidth - 2
}

const scrollColors = (direction: -1 | 1) => {
  const element = rail.value
  if (!element) return

  element.scrollBy({
    left: direction * Math.max(element.clientWidth * 0.75, 240),
    behavior: 'smooth',
  })
}

const handleWheel = (event: WheelEvent) => {
  const element = rail.value
  if (!element || element.scrollWidth <= element.clientWidth) return

  const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
  const maxScroll = element.scrollWidth - element.clientWidth
  const canMove = delta < 0 ? element.scrollLeft > 0 : element.scrollLeft < maxScroll

  if (!canMove) return
  event.preventDefault()
  element.scrollLeft += delta
}

onMounted(() => {
  nextTick(updateScrollState)
  resizeObserver = new ResizeObserver(updateScrollState)
  if (rail.value) resizeObserver.observe(rail.value)
})

onBeforeUnmount(() => resizeObserver?.disconnect())
</script>

<template>
  <div v-if="colors.length" class="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
    <span class="shrink-0 text-sm font-medium">Цветовые исполнения:</span>
    <div class="flex min-w-0 flex-1 items-center gap-2">
      <button
        type="button"
        class="grid h-9 w-9 shrink-0 place-items-center border border-border bg-white transition hover:border-primary disabled:cursor-default disabled:opacity-30"
        :disabled="!canScrollLeft"
        aria-label="Предыдущие цвета"
        @click="scrollColors(-1)"
      >
        <ArrowLeft class="h-4 w-4" />
      </button>

      <div
        ref="rail"
        class="min-w-0 flex-1 snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        tabindex="0"
        aria-label="Цветовые исполнения коллекции"
        @scroll.passive="updateScrollState"
        @wheel="handleWheel"
      >
        <div class="flex w-max gap-2">
          <span
            v-for="item in colors"
            :key="item.id"
            class="inline-flex shrink-0 snap-start items-center gap-2 whitespace-nowrap border border-border bg-white px-3 py-2 text-xs"
          >
            <span class="h-4 w-4 shrink-0 rounded-full border border-black/10" :style="{ backgroundColor: item.hex }" />
            {{ item.name }}
          </span>
        </div>
      </div>

      <button
        type="button"
        class="grid h-9 w-9 shrink-0 place-items-center border border-border bg-white transition hover:border-primary disabled:cursor-default disabled:opacity-30"
        :disabled="!canScrollRight"
        aria-label="Следующие цвета"
        @click="scrollColors(1)"
      >
        <ArrowRight class="h-4 w-4" />
      </button>
    </div>
  </div>
</template>
