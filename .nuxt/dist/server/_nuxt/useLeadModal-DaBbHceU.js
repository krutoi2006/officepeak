import { u as useState } from "./state-tqLlnwND.js";
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
export {
  useLeadModal as u
};
//# sourceMappingURL=useLeadModal-DaBbHceU.js.map
