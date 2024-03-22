import { memo } from "react";
import "./style.css";
import { useDraggable } from "@dnd-kit/core";
import { cn as bem } from "@bem-react/classname";

interface IAccItemProps {
  id: number;
  show: boolean;
  data: {
    type: "image" | "text";
    str: string;
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
  

  // const style = transform
  //   ? {
  //       transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  //     }
  //   : undefined;
  //   console.log(transform);

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn({isDragging})}
      // style={style}
      // onMouseDown={callbacks.onMouse}
      // onClick={() => console.log(coord)}
    >
      {props.data.type === "image" && <img className={cn("image")} src={props.data.str}/>}
      {props.data.type === "text" && <div className={cn("text")}>{props.data.str}</div>}
      
    </div>
  );
}

export default memo(AccDraggableItem);
