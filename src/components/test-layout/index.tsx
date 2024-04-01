import React, { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

interface ITestLayoutProps {
  children: React.ReactNode;
}
function TestLayout(props: ITestLayoutProps) {
  const cn = bem("TestLayout");

  return (<div className={cn()}>
    {props.children}
  </div>);
}

export default memo(TestLayout);
