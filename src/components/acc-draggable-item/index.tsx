import { memo, useCallback, useEffect, useRef, useState } from "react";
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
    transform,
  } = useDraggable({
    id: props.id,
  });
  // const elementRef = useRef<HTMLDivElement>(null);

  // const [coord, setCoord] = useState({x: 0, y: 0});
  
  // useEffect(() => {
  //   callbacks.onMouse();
    

  // }, []);

  // const callbacks = {
  //   onMouse: useCallback(() => {
  //     if (!elementRef.current) {
  //       return;
  //     }
  //     let top = 0;
  //     if (elementRef.current.parentElement?.parentElement?.parentElement) {
  //       top = elementRef.current.parentElement?.parentElement.parentElement.scrollTop;
  //     }
  //     console.log(top);
  //     const rect = elementRef.current.getBoundingClientRect();
  //     setCoord({x: rect.x, y: top});
  //     console.log({x: rect.x, y: rect.y});
  //   }, [elementRef.current])
  // }
  

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn({dragged: transform !== null})}
      style={style}
      // onMouseDown={callbacks.onMouse}
      // onClick={() => console.log(coord)}
    >
      {props.data.type === "image" && <img className={cn("image")} src={props.data.str}/>}
      {props.data.type === "text" && <div className={cn("text")}>{props.data.str}</div>}
      
    </div>
  );
}

export default memo(AccDraggableItem);
