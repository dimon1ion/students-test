import React, { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

interface ITestRightSideLayoutProps {
  children: React.ReactNode;
}
function TestRightSideLayout(props: ITestRightSideLayoutProps) {
  const cn = bem("TestRightSideLayout");

  return (<div className={cn()}>
    {props.children}
  </div>);
}

export default memo(TestRightSideLayout);
