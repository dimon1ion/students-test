import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import arrow from "./arrow.svg";
import "./style.css";

interface ButtonBackProps {
  onClick: () => void;
}

function ButtonBack(props: ButtonBackProps) {
  const cn = bem("ButtonBack");
  return (
    <div className={cn()} onClick={props.onClick}>
      <button className={cn("button")}>
        <img src={arrow}/>
      </button>
    </div>
  );
}

export default memo(ButtonBack);
