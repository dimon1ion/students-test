import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { IModuleTask } from "@src/services/store/main/types";
import { Tooltip } from "antd";

interface IMainTaskProps {
  data: IModuleTask;
  number: number;
}
function MainTask(props: IMainTaskProps) {
  const cn = bem("MainTask");

  return (<div className={cn({active: props.data.status == "during"})}>
    <div className={cn("circle", {active: props.data.status == "during"})}>
        {props.number}
    </div>
    <div className={cn("title")}>
        <Tooltip title={props.data.title} placement="right">
            {props.data.title}
        </Tooltip>
    </div>
  </div>);
}

export default memo(MainTask);
