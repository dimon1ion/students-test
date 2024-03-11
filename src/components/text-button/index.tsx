import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

interface TextButtonProps {
  text: string;
  showTextCommand: string;
  onClick: () => void;
}

function TextButton(props: TextButtonProps) {
  const cn = bem("TextButton");

  return (
    <button className={cn()} onClick={props.onClick}>
      <div className={cn("text")}>{props.text}</div>
      <div className={cn("text")}>{props.showTextCommand}</div>
    </button>
  );
}

export default memo(TextButton);
