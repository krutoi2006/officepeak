export type LeadFormType = 'callback' | 'design' | 'message' | 'manager' | 'tender'

export const useLeadModal = () => {
  const isOpen = useState('lead-modal-open', () => false)
  const type = useState<LeadFormType>('lead-modal-type', () => 'callback')
  const open = (formType: LeadFormType) => {
    type.value = formType
    isOpen.value = true
  }
  const close = () => { isOpen.value = false }
  return { isOpen, type, open, close }
}
