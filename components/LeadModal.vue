<script setup lang="ts">
import { AlertCircle, CheckCircle2, Loader2, X } from 'lucide-vue-next'
import type { LeadFormType } from '~/composables/useLeadModal'

const { isOpen, type, close } = useLeadModal()
const panel = ref<HTMLElement | null>(null)
const sending = ref(false)
const submitted = ref(false)
const result = ref<{ success: boolean; text: string } | null>(null)
const errors = reactive<Record<string, string>>({})
const form = reactive({ name: '', phone: '', consent: false, website: '' })
let opener: HTMLElement | null = null

const definitions: Record<LeadFormType, { title: string; intro: string }> = {
  callback: { title: 'Заказать звонок', intro: 'Оставьте ФИО и телефон. Мы вам позвоним.' },
  design: { title: 'Дизайн-проект', intro: 'Оставьте ФИО и телефон. Мы обсудим проект.' },
  message: { title: 'Написать нам', intro: 'Оставьте ФИО и телефон. Мы свяжемся с вами.' },
  manager: { title: 'Вызвать менеджера', intro: 'Оставьте ФИО и телефон. Менеджер вам позвонит.' },
  tender: { title: 'Отправить заявку', intro: 'Оставьте ФИО и телефон. Мы свяжемся с вами.' },
}
const definition = computed(() => definitions[type.value])

const reset = () => {
  Object.assign(form, { name: '', phone: '', consent: false, website: '' })
  result.value = null
  submitted.value = false
  Object.keys(errors).forEach(key => delete errors[key])
}
const closeModal = () => { close(); setTimeout(() => opener?.focus(), 0) }
const validate = () => {
  Object.keys(errors).forEach(key => delete errors[key])
  if (form.name.trim().length < 2) errors.name = 'Укажите ФИО.'
  if (form.phone.replace(/\D/g, '').length < 10) errors.phone = 'Укажите телефон полностью.'
  if (!form.consent) errors.consent = 'Необходимо согласие на обработку данных.'
  return !Object.values(errors).some(Boolean)
}
const submit = async () => {
  if (sending.value || submitted.value || !validate()) return
  sending.value = true
  result.value = null
  try {
    const response = await $fetch<{ requestId: string; message: string }>('/api/leads', {
      method: 'POST',
      body: { type: type.value, ...form },
    })
    result.value = { success: true, text: `${response.message} Номер: ${response.requestId}.` }
    submitted.value = true
  } catch (error: unknown) {
    const fetchError = error as { data?: { message?: string; statusMessage?: string } }
    result.value = {
      success: false,
      text: fetchError.data?.message ?? fetchError.data?.statusMessage ?? 'Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.',
    }
  } finally { sending.value = false }
}
const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') { event.preventDefault(); closeModal(); return }
  if (event.key !== 'Tab' || !panel.value) return
  const focusable = [...panel.value.querySelectorAll<HTMLElement>('button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])')].filter(item => !item.hasAttribute('disabled'))
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
}

watch(isOpen, async (value) => {
  if (!import.meta.client) return
  if (value) {
    opener = document.activeElement as HTMLElement
    reset()
    document.body.style.overflow = 'hidden'
    await nextTick()
    panel.value?.querySelector<HTMLElement>('input')?.focus()
  } else document.body.style.overflow = ''
})
onBeforeUnmount(() => { if (import.meta.client) document.body.style.overflow = '' })
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/55 p-4" @mousedown.self="closeModal">
        <section ref="panel" role="dialog" aria-modal="true" :aria-labelledby="`lead-title-${type}`" class="relative my-auto w-full max-w-2xl bg-white p-6 shadow-2xl sm:p-9" @keydown="onKeydown">
          <button type="button" class="icon-button absolute right-4 top-4" aria-label="Закрыть форму" @click="closeModal"><X class="h-5 w-5" /></button>
          <h2 :id="`lead-title-${type}`" class="mb-3 pr-12 text-3xl font-light sm:text-4xl">{{ definition.title }}</h2>
          <p class="mb-7 max-w-xl text-sm leading-6 text-secondary">{{ definition.intro }}</p>
          <form class="grid gap-5 sm:grid-cols-2" novalidate @submit.prevent="submit">
            <label class="field-label">ФИО <span aria-hidden="true">*</span><input v-model="form.name" autocomplete="name" class="field-input" :aria-invalid="Boolean(errors.name)"><span v-if="errors.name" class="field-error">{{ errors.name }}</span></label>
            <label class="field-label">Телефон <span aria-hidden="true">*</span><input v-model="form.phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="+7 999 000-00-00" class="field-input" :aria-invalid="Boolean(errors.phone)"><span v-if="errors.phone" class="field-error">{{ errors.phone }}</span></label>
            <label class="sr-only" aria-hidden="true">Сайт<input v-model="form.website" tabindex="-1" autocomplete="off"></label>
            <label class="flex items-start gap-3 text-sm leading-5 sm:col-span-2"><input v-model="form.consent" type="checkbox" class="mt-1 h-4 w-4 accent-accent"><span>Я согласен на <NuxtLink to="/personal-data-consent" class="underline">обработку персональных данных</NuxtLink>.</span></label>
            <span v-if="errors.consent" class="field-error sm:col-span-2">{{ errors.consent }}</span>
            <div class="sm:col-span-2"><button type="submit" class="btn-primary min-w-48" :disabled="sending || submitted"><Loader2 v-if="sending" class="h-4 w-4 animate-spin" />{{ sending ? 'Отправляем…' : submitted ? 'Заявка отправлена' : 'Отправить' }}</button></div>
          </form>
          <p v-if="result" class="mt-6 flex items-start gap-2 border-t border-border pt-5 text-sm leading-6"><CheckCircle2 v-if="result.success" class="mt-0.5 h-5 w-5 shrink-0 text-accent" /><AlertCircle v-else class="mt-0.5 h-5 w-5 shrink-0 text-accent" />{{ result.text }}</p>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>
