import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

interface IModalTaskResultProps {
  text: string;
  mark?: number;
  onNext?: () => void;
  onResult?: () => void;
}

function ModalTaskResult(props: IModalTaskResultProps) {
  const cn = bem("ModalTaskResult");

  return (
    <>
      <div className={cn("text")}>{props.text}</div>
      {props.mark !== undefined && (
        <div className={cn("mark")}>Баллы: {props.mark}</div>
      )}
      <div className={cn("buttons")}>
        {props.onResult && <button className={cn("resButton")} onClick={props.onResult}>К Результатам</button>}
        <button className={cn("nextButton")} onClick={props.onNext}>{props.onResult ? "Модули" : "Дальше"}</button>
      </div>
    </>
  );
}

export default memo(ModalTaskResult);
