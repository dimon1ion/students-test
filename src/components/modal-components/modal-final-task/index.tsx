import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

interface IModalFinalTaskProps {
  text: string;
  onNext?: () => void;
  onBack?: () => void;
}

function ModalFinalTask(props: IModalFinalTaskProps) {
  const cn = bem("ModalTaskResult");

  return (
    <>
      <div className={cn("text")}>{props.text}</div>
      <div className={cn("buttons")}>
        {props.onBack && <button className={cn("resButton")} onClick={props.onBack}>Отмена</button>}
        <button className={cn("nextButton")} onClick={props.onNext}>Дальше</button>
      </div>
    </>
  );
}

export default memo(ModalFinalTask);
