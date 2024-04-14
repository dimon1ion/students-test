import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { IModuleTask } from "@src/services/store/main/types";
import { Tooltip } from "antd";
import { TaskType } from "@src/types";
import finishedIcon from "./finished.svg";

interface IMainTaskProps {
  data: IModuleTask;
  number: number;
  link: string;
  onClick: (taskId: IModuleTask["id"], taskType: TaskType) => void;
}
function MainTask(props: IMainTaskProps) {
  const cn = bem("MainTask");

  const callbacks = {
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (props.data.status === "активно") {
        props.onClick(props.data.id, props.data.type)
      }
    }
  }

  return (
    <a
      href={props.data.status == "активно" ? props.link : undefined}
      className={cn({ active: props.data.status == "активно" })}
      onClick={callbacks.onClick}
    >
      <div className={cn("circle", { active: props.data.status == "активно"})}>
        {props.data.status === "закончено" && <img src={finishedIcon} className={cn("finishedIcon")}/>}
        {props.number}
      </div>
      <div className={cn("title")}>
        <Tooltip title={props.data.description} placement="right">
          {props.data.description}
        </Tooltip>
      </div>
    </a>
  );
}

export default memo(MainTask);