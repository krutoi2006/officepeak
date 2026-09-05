<script setup lang="ts">
import { Minus, Plus } from 'lucide-vue-next'

const props = withDefaults(defineProps<{ modelValue: number; label?: string }>(), { label: 'Количество' })
const emit = defineEmits<{ 'update:modelValue': [value: number] }>()
const update = (value: number) => emit('update:modelValue', Math.max(1, Math.min(999, Math.round(value || 1))))
</script>

<template>
  <div class="inline-flex h-11 items-center border border-border" role="group" :aria-label="label">
    <button type="button" class="icon-button h-full rounded-none" :aria-label="`Уменьшить: ${label}`" @click="update(modelValue - 1)">
      <Minus class="h-4 w-4" />
    </button>
    <input
      :value="modelValue"
      type="number"
      min="1"
      max="999"
      inputmode="numeric"
      class="h-full w-12 border-x border-border bg-transparent text-center text-sm outline-none"
      :aria-label="label"
      @input="update(Number(($event.target as HTMLInputElement).value))"
    >
    <button type="button" class="icon-button h-full rounded-none" :aria-label="`Увеличить: ${label}`" @click="update(modelValue + 1)">
      <Plus class="h-4 w-4" />
    </button>
  </div>
</template>
