import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { IModuleTask } from "@src/services/store/main/types";
import { Tooltip } from "antd";
import { TaskType } from "@src/types";

interface IMainTaskProps {
  data: IModuleTask;
  number: number;
  link: string;
  onClick: (taskId: number | string, taskType: TaskType) => void;
}
function MainTask(props: IMainTaskProps) {
  const cn = bem("MainTask");

  const callbacks = {
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      props.onClick(props.data.taskId, props.data.taskType)
    }
  }

  return (
    <a
      href={props.link}
      className={cn({ active: props.data.status == "during" })}
      onClick={props.data.status !== "ready" ? callbacks.onClick : () => {}}
    >
      <div className={cn("circle", { active: props.data.status == "during" })}>
        {props.number}
      </div>
      <div className={cn("title")}>
        <Tooltip title={props.data.title} placement="right">
          {props.data.title}
        </Tooltip>
      </div>
    </a>
  );
}

export default memo(MainTask);
