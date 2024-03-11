import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

interface LevelWrapperProps {
  children?: React.ReactNode;
  title: string;
}

function LevelWrapper(props: LevelWrapperProps) {
  const cn = bem("LevelWrapper");
  return (
    <div className={cn()}>
      <div className={cn("title")}>{props.title}</div>
      {props.children}
    </div>
  );
}

export default memo(LevelWrapper);
