import React, { memo, useMemo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { Button, ButtonProps } from "antd";
import { ModuleStatus } from "@src/types";

export interface IMainTasksLayoutProps {
  title: string;
  status: ModuleStatus;
  children: React.ReactNode;
  loading: boolean;
  onButtonClick?: () => void;
}
function MainTasksLayout({onButtonClick = () => {}, ...props}: IMainTasksLayoutProps) {
  const cn = bem("MainTasksLayout");

  const render = {
    button: useMemo(() => {
      const params: ButtonProps = {loading: props.loading, onClick: () => onButtonClick()};
      switch (props.status) {
        case "не начат":
          return <Button type={"primary"} {...params}>Начать тест</Button>;
        case "начат":
          return <Button danger type={"default"} {...params}>Завершить тест</Button>
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
