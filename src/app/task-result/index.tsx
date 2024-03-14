import { memo, useCallback } from "react";
import ModalLayout from "@src/components/modal-layout";
import useStore from "@src/hooks/use-store";
import ModalTaskResult from "@src/components/modal-task-result";

interface ITaskResultProps {
    closeModal: (result?: unknown) => void;
}

function TaskResult({ closeModal }: ITaskResultProps) {
  const store = useStore();

  


  const callbacks = {
    onButtonClick: useCallback(() => {
        closeModal();
    }, [])
  };

  return (
    <ModalLayout>
      <ModalTaskResult text="Задание выполнено"/>
    </ModalLayout>
  );
}

export default memo(TaskResult);
