import {memo} from "react";
import { cn as bem } from "@bem-react/classname";
import './style.css';

interface IAccItemWrapperProps {
  children?: React.ReactNode,
  type: "variant" | "answer",
  border?: boolean,
}

function AccItemWrapper({border = false, ...props}: IAccItemWrapperProps){
  const cn = bem("AccItemWrapper");
  return (
    <div className={cn({type: props.type, border })}>
      {props.children}
    </div>
  )
}

export default memo(AccItemWrapper);
