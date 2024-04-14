import React, { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

interface IResultLayoutProps {
  children: React.ReactNode;
}
function ResultLayout(props: IResultLayoutProps) {
  const cn = bem("ResultLayout");

  return (<div className={cn()}>
    {props.children}
  </div>);
}

export default memo(ResultLayout);
