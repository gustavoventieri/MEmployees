import { FormHandles } from "@unform/core";
import { useCallback, useRef } from "react";

export const useVForm = () => {
  const formRef = useRef<FormHandles>(null);

  const isSavingAndClose = useRef(false);

  const handleSave = useCallback(() => {
    isSavingAndClose.current = false;
    formRef.current?.submitForm();
  }, []);

  const handleSaveAndClose = useCallback(() => {
    isSavingAndClose.current = true;
    formRef.current?.submitForm();
  }, []);

  const handleIsSaveAndClose = useCallback(() => {
    return isSavingAndClose.current;
  }, []);

  return {
    formRef,

    save: handleSave,
    
    saveAndClose: handleSaveAndClose,

    isSaveAndClose: handleIsSaveAndClose,
  };
};
