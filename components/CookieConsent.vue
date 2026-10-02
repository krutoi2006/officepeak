<script setup lang="ts">
import { Cookie } from 'lucide-vue-next'

const { accepted, accept } = useCookieConsent()
</script>

<template>
  <Transition name="cookie-banner">
    <aside
      v-if="!accepted"
      class="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-5xl border border-white/15 bg-primary p-5 text-white shadow-2xl sm:inset-x-6 sm:bottom-6 sm:p-6"
      role="region"
      aria-label="Уведомление об использовании cookie"
      aria-live="polite"
    >
      <div class="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex max-w-3xl items-start gap-4">
          <Cookie class="mt-0.5 h-6 w-6 shrink-0 text-accent" aria-hidden="true" />
          <div>
            <h2 class="mb-1 text-lg font-medium tracking-normal">Мы используем cookie</h2>
            <p class="text-sm leading-6 text-white/70">
              Cookie помогают сохранить товары в вашей корзине и избранном на этом устройстве. Продолжая работу с сайтом, вы соглашаетесь с их использованием согласно
              <NuxtLink to="/cookie-policy" class="text-white underline underline-offset-4 hover:text-accent">политике использования cookie</NuxtLink>.
            </p>
          </div>
        </div>
        <button type="button" class="btn-light w-full shrink-0 sm:w-auto" @click="accept">
          Принять
        </button>
      </div>
    </aside>
  </Transition>
</template>
