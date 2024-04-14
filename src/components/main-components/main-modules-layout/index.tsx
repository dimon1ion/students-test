import React, { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

interface IMainModulesLayoutProps {
  children: React.ReactNode;
}
function MainModulesLayout(props: IMainModulesLayoutProps) {
  const cn = bem("MainModulesLayout");

  return (<div className={cn()}>
    {props.children}
  </div>);
}

export default memo(MainModulesLayout);
