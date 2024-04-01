import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import checkboxIcon from "./checkbox.svg";
import selectedCheckboxIcon from "./checkbox_selected.svg";

interface TestAnswerProps {
  type: "string" | "image";
  selected: boolean;
  value: string;
  showCheckbox?: boolean;
  onClick: () => void;
}
function TestAnswer({ showCheckbox = true, ...props }: TestAnswerProps) {
  const cn = bem("TestAnswer");

  return (
    <div
      className={cn({ type: props.type, selected: props.selected, padding: !showCheckbox })}
      onClick={props.onClick}
    >
      {showCheckbox && (
        <img
          src={props.selected ? selectedCheckboxIcon : checkboxIcon}
          className={cn("icon")}
          alt=""
        />
      )}
      {props.type === "image" && (
        <img className={cn("image")} src={props.value} />
      )}
      {props.type === "string" && (
        <div className={cn("string")}>{props.value}</div>
      )}
    </div>
  );
}

export default memo(TestAnswer);
