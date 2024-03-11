import React, { memo, useMemo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { Button } from "antd";
import { ModuleStatus } from "@src/types";

export interface IMainTasksLayoutProps {
  title: string;
  status?: ModuleStatus;
  children: React.ReactNode;
  onButtonClick?: (status?: ModuleStatus) => void;
}
function MainTasksLayout({onButtonClick = () => {}, ...props}: IMainTasksLayoutProps) {
  const cn = bem("MainTasksLayout");

  const render = {
    button: useMemo(() => {
      switch (props.status) {
        case "ready":
          return <Button type={"primary"} onClick={() => onButtonClick(props.status)}>Начать тест</Button>;
        case "started":
          return <Button danger type={"default"} onClick={() => onButtonClick(props.status)}>Завершить тест</Button>
        default:
          return <></>
      }
    }, [props.status])
  }

  return (<div className={cn()}>
    <div className={cn("top")}>
      <h4 className={cn("title")}>{props.title}</h4>
      {render.button}
    </div>
    <div className={cn("children")}>{props.children}</div>
  </div>);
}

export default memo(MainTasksLayout);
