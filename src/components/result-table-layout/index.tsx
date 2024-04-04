import React, { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

interface IResultTableLayoutProps {
  children: React.ReactNode;
}
function ResultTableLayout(props: IResultTableLayoutProps) {
  const cn = bem("ResultTableLayout");

  return (<div className={cn()}>
    {props.children}
  </div>);
}

export default memo(ResultTableLayout);
