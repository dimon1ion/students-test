import { memo } from "react";
import "./style.css";
import { useDraggable } from "@dnd-kit/core";
import { cn as bem } from "@bem-react/classname";
import { Tooltip } from "antd";

interface IAccItemProps {
  id: number;
  show: boolean;
  showPrompt?: boolean;
  data: {
    prompt?: string;
    value_type: "image" | "string" | "order";
    value: string;
  }
  size?: "small";
}

function AccDraggableItem({showPrompt = true, ...props}: IAccItemProps) {
  if (!props.show) {
    return <></>;
  }

  const cn = bem("AccDraggableItem");

  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging
  } = useDraggable({
    id: props.id,
  });
  

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn({isDragging})}
    >
      {props.data.value_type === "image" && <Tooltip title={showPrompt ? props.data.prompt : ""}><img className={cn("image")} src={props.data.value}/></Tooltip>}
      {props.data.value_type === "string" && <div className={cn("text", {size: props.size})}>{props.data.value}</div>}
    </div>
  );
}

export default memo(AccDraggableItem);
