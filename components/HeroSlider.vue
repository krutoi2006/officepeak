<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { demoMedia } from '~/data/demoMedia'

const slides = [
  { image: demoMedia.hero[0], alt: 'Светлый офис' },
  { image: demoMedia.hero[1], alt: 'Современный офис' },
  { image: demoMedia.hero[2], alt: 'Рабочее пространство' },
]

const current = ref(0)
const paused = ref(false)
const reducedMotion = ref(false)
const position = ref(1)
const transitionEnabled = ref(true)
let timer: ReturnType<typeof setInterval> | undefined

const renderedSlides = [slides[slides.length - 1]!, ...slides, slides[0]!]

const go = (index: number) => {
  const normalizedIndex = (index + slides.length) % slides.length
  transitionEnabled.value = true

  if (index === current.value + 1) position.value += 1
  else if (index === current.value - 1) position.value -= 1
  else position.value = normalizedIndex + 1

  current.value = normalizedIndex
}

const finishTransition = () => {
  if (position.value === 0) {
    transitionEnabled.value = false
    position.value = slides.length
  } else if (position.value === slides.length + 1) {
    transitionEnabled.value = false
    position.value = 1
  }
}

const restart = () => {
  if (timer) clearInterval(timer)
  if (!paused.value && !reducedMotion.value) timer = setInterval(() => go(current.value + 1), 6500)
}

watch([paused, current], restart)
onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  restart()
})
onBeforeUnmount(() => { if (timer) clearInterval(timer) })
</script>

<template>
  <section
    class="relative min-h-[620px] overflow-hidden bg-primary text-white md:min-h-[720px]"
    aria-roledescription="carousel"
    aria-label="Предложения OFFICEPEAK"
    tabindex="0"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
    @focusin="paused = true"
    @focusout="paused = false"
    @keydown.left.prevent="go(current - 1)"
    @keydown.right.prevent="go(current + 1)"
  >
    <div
      class="absolute inset-0 flex will-change-transform motion-reduce:transition-none"
      :class="transitionEnabled && !reducedMotion ? 'transition-transform duration-700 ease-in-out' : ''"
      :style="{ transform: `translate3d(-${position * 100}%, 0, 0)` }"
      @transitionend="finishTransition"
    >
      <article
        v-for="(slide, index) in renderedSlides"
        :key="`${slide.image}-${index}`"
        class="relative h-full w-full shrink-0"
        :aria-hidden="index !== position"
      >
        <img :src="slide.image" :alt="slide.alt" :loading="index <= 1 ? 'eager' : 'lazy'" class="absolute inset-0 h-full w-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
      </article>
    </div>
    <div class="container-page relative z-10 flex min-h-[620px] items-end pb-24 pt-28 md:min-h-[720px] md:items-center md:py-28">
      <div class="max-w-3xl">
        <h1 class="mb-7 max-w-3xl text-[42px] font-light leading-[.98] sm:text-6xl md:text-7xl lg:text-[86px]">Офисная мебель нового поколения</h1>
        <p class="mb-9 max-w-xl text-base font-light leading-7 text-white/80 md:text-lg">Функциональные решения для вашего офиса</p>
        <NuxtLink to="/catalog" class="btn-light">Смотреть каталог <ArrowRight class="h-4 w-4" /></NuxtLink>
      </div>
    </div>
    <div class="container-page absolute inset-x-0 bottom-6 z-20">
      <div class="flex gap-2" role="tablist" aria-label="Выбор слайда">
        <button v-for="(_, index) in slides" :key="index" type="button" class="h-1.5 transition-all" :class="index === current ? 'w-10 bg-white' : 'w-5 bg-white/40'" :aria-label="`Слайд ${index + 1}`" :aria-selected="index === current" role="tab" @click="go(index)" />
      </div>
    </div>
  </section>
</template>
