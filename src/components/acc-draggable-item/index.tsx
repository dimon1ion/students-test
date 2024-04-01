import { memo } from "react";
import "./style.css";
import { useDraggable } from "@dnd-kit/core";
import { cn as bem } from "@bem-react/classname";

interface IAccItemProps {
  id: number;
  show: boolean;
  data: {
    value_type: "image" | "string" | "order";
    value: string;
  }
}

function AccDraggableItem(props: IAccItemProps) {
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
      {props.data.value_type === "image" && <img className={cn("image")} src={props.data.value}/>}
      {props.data.value_type === "string" && <div className={cn("text")}>{props.data.value}</div>}
    </div>
  );
}

export default memo(AccDraggableItem);
