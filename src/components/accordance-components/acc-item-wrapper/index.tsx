import {memo} from "react";
import { cn as bem } from "@bem-react/classname";
import './style.css';

interface IAccItemWrapperProps {
  children?: React.ReactNode,
  type: "variant" | "answer",
  size?: "small",
  border?: boolean,
}

function AccItemWrapper({border = false, ...props}: IAccItemWrapperProps){
  const cn = bem("AccItemWrapper");
  return (
    <div className={cn({type: props.type, border, hasNoChild: !props.children, size: props.size })}>
      {props.children}
    </div>
  )
}

export default memo(AccItemWrapper);
