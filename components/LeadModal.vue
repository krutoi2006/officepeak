<script setup lang="ts">
import { AlertCircle, CheckCircle2, Loader2, X } from 'lucide-vue-next'
import { siteConfig } from '~/config/site'
import type { LeadFormType } from '~/composables/useLeadModal'

const { isOpen, type, close } = useLeadModal()
const panel = ref<HTMLElement | null>(null)
const file = ref<File | null>(null)
const sending = ref(false)
const submitted = ref(false)
const result = ref('')
const errors = reactive<Record<string, string>>({})
const form = reactive({ name: '', phone: '', email: '', company: '', message: '', consent: false, website: '' })
let opener: HTMLElement | null = null

const definitions: Record<LeadFormType, { title: string; intro: string; email?: 'required' | 'optional'; company?: boolean; message?: boolean; file?: boolean }> = {
  callback: { title: 'Заказать звонок', intro: 'Оставьте имя и телефон. Мы вам позвоним.' },
  design: { title: 'Дизайн-проект', intro: 'Расскажите, что нужно сделать. Можно добавить файл.', email: 'required', file: true },
  message: { title: 'Написать нам', intro: 'Задайте вопрос или опишите задачу.', email: 'optional', message: true },
  manager: { title: 'Вызвать менеджера', intro: 'Оставьте имя и телефон.' },
  tender: { title: 'Отправить заявку', intro: 'Укажите имя и название организации.', company: true },
}
const definition = computed(() => definitions[type.value])

const reset = () => {
  Object.assign(form, { name: '', phone: '', email: '', company: '', message: '', consent: false, website: '' })
  file.value = null
  result.value = ''
  submitted.value = false
  Object.keys(errors).forEach(key => delete errors[key])
}
const closeModal = () => { close(); setTimeout(() => opener?.focus(), 0) }
const onFile = (event: Event) => {
  const selected = (event.target as HTMLInputElement).files?.[0] ?? null
  errors.file = ''
  file.value = null
  if (!selected) { file.value = null; return }
  const extension = `.${selected.name.split('.').pop()?.toLowerCase()}`
  if (!siteConfig.forms.acceptedFileExtensions.includes(extension as never) || !siteConfig.forms.acceptedMimeTypes.includes(selected.type as never)) errors.file = 'Формат файла не поддерживается.'
  else if (selected.size > siteConfig.forms.maxFileSizeBytes) errors.file = 'Файл должен быть не больше 10 МБ.'
  else file.value = selected
}
const validate = () => {
  Object.keys(errors).forEach(key => delete errors[key])
  if (form.name.trim().length < 2) errors.name = 'Укажите имя.'
  if (form.phone.replace(/\D/g, '').length < 10) errors.phone = 'Укажите телефон полностью.'
  if (definition.value.email === 'required' && !form.email.trim()) errors.email = 'Укажите email.'
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Проверьте формат email.'
  if (definition.value.company && form.company.trim().length < 2) errors.company = 'Укажите название компании.'
  if (!form.consent) errors.consent = 'Необходимо согласие на обработку данных.'
  return !Object.values(errors).some(Boolean)
}
const submit = async () => {
  if (sending.value || submitted.value || !validate()) return
  sending.value = true
  result.value = ''
  const body = new FormData()
  Object.entries(form).forEach(([key, value]) => body.append(key, String(value)))
  body.append('type', type.value)
  if (file.value) body.append('file', file.value, file.value.name)
  try {
    const response = await $fetch<{ requestId: string; deliveryConfigured: boolean; message: string }>('/api/leads', { method: 'POST', body })
    result.value = `${response.message} Номер: ${response.requestId}.`
    submitted.value = true
  } catch (error: any) {
    result.value = error?.data?.statusMessage ?? 'Не удалось проверить форму. Попробуйте ещё раз или свяжитесь с нами по телефону.'
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
            <label class="field-label">Имя <span aria-hidden="true">*</span><input v-model="form.name" autocomplete="name" class="field-input" :aria-invalid="Boolean(errors.name)"><span v-if="errors.name" class="field-error">{{ errors.name }}</span></label>
            <label class="field-label">Телефон <span aria-hidden="true">*</span><input v-model="form.phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="+7 999 000-00-00" class="field-input" :aria-invalid="Boolean(errors.phone)"><span v-if="errors.phone" class="field-error">{{ errors.phone }}</span></label>
            <label v-if="definition.email" class="field-label sm:col-span-2">Email <span v-if="definition.email === 'required'" aria-hidden="true">*</span><input v-model="form.email" type="email" autocomplete="email" class="field-input" :aria-invalid="Boolean(errors.email)"><span v-if="errors.email" class="field-error">{{ errors.email }}</span></label>
            <label v-if="definition.company" class="field-label sm:col-span-2">Название компании <span aria-hidden="true">*</span><input v-model="form.company" autocomplete="organization" class="field-input" :aria-invalid="Boolean(errors.company)"><span v-if="errors.company" class="field-error">{{ errors.company }}</span></label>
            <label v-if="definition.message" class="field-label sm:col-span-2">Сообщение<textarea v-model="form.message" rows="4" class="field-input resize-y" /></label>
            <label v-if="definition.file" class="field-label sm:col-span-2">Файл проекта<input type="file" class="field-input file:mr-4 file:border-0 file:bg-surface file:px-3 file:py-2" :accept="siteConfig.forms.acceptedFileExtensions.join(',')" @change="onFile"><span class="mt-1 block text-xs font-normal text-secondary">PDF, DOC(X), XLS(X), JPG или PNG, до 10 МБ.</span><span v-if="errors.file" class="field-error">{{ errors.file }}</span></label>
            <label class="sr-only" aria-hidden="true">Сайт<input v-model="form.website" tabindex="-1" autocomplete="off"></label>
            <label class="flex items-start gap-3 text-sm leading-5 sm:col-span-2"><input v-model="form.consent" type="checkbox" class="mt-1 h-4 w-4 accent-accent"><span>Я согласен на <NuxtLink to="/personal-data-consent" class="underline">обработку персональных данных</NuxtLink>.</span></label>
            <span v-if="errors.consent" class="field-error sm:col-span-2">{{ errors.consent }}</span>
            <div class="sm:col-span-2"><button type="submit" class="btn-primary min-w-48" :disabled="sending || submitted"><Loader2 v-if="sending" class="h-4 w-4 animate-spin" />{{ sending ? 'Проверяем…' : submitted ? 'Форма проверена' : 'Отправить' }}</button></div>
          </form>
          <p v-if="result" class="mt-6 flex items-start gap-2 border-t border-border pt-5 text-sm leading-6"><CheckCircle2 v-if="result.includes('проверены')" class="mt-0.5 h-5 w-5 shrink-0 text-accent" /><AlertCircle v-else class="mt-0.5 h-5 w-5 shrink-0 text-accent" />{{ result }}</p>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>
