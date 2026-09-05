globalThis.__timing__.logStart('Load chunks/build/useLeadModal-DaBbHceU');import { u as useState } from './state-tqLlnwND.mjs';

const useLeadModal = () => {
  const isOpen = useState("lead-modal-open", () => false);
  const type = useState("lead-modal-type", () => "callback");
  const open = (formType) => {
    type.value = formType;
    isOpen.value = true;
  };
  const close = () => {
    isOpen.value = false;
  };
  return { isOpen, type, open, close };
};

export { useLeadModal as u };;globalThis.__timing__.logEnd('Load chunks/build/useLeadModal-DaBbHceU');
//# sourceMappingURL=useLeadModal-DaBbHceU.mjs.map
