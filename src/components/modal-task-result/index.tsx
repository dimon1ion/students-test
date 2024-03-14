import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

interface IModalTaskResultProps {
  text: string;
  mark?: number;
  onNext?: () => void;
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
        <button className={cn("nextButton")} onClick={props.onNext}>Дальше</button>
        {/* <button className={cn("repButton")}>Повторить</button> */}
      </div>
    </>
  );
}

export default memo(ModalTaskResult);
