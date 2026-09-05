<script setup lang="ts">
defineProps<{ error: { statusCode?: number; statusMessage?: string; message?: string } }>()
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-surface p-5">
    <main class="w-full max-w-2xl bg-white p-8 text-center shadow-subtle sm:p-14">
      <p class="eyebrow">Ошибка {{ error.statusCode ?? 404 }}</p>
      <h1 class="mb-5 display-title">{{ error.statusCode === 404 ? 'Страница не найдена' : 'Что-то пошло не так' }}</h1>
      <p class="mb-8 text-secondary">{{ error.statusMessage || error.message || 'Запрошенная страница недоступна.' }}</p>
      <div class="flex flex-wrap justify-center gap-3"><button type="button" class="btn-primary" @click="handleError">На главную</button><NuxtLink to="/catalog" class="btn-secondary">Открыть каталог</NuxtLink></div>
    </main>
  </div>
</template>
