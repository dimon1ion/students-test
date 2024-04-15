import React, { memo } from "react";
import { cn as bem, cn } from "@bem-react/classname";
import "./style.css";
import { useDroppable } from "@dnd-kit/core";
import AccItemWrapper from "../acc-item-wrapper";

interface IAccAnswersItemProps {
  id: number | string;
  element?: React.ReactNode;
  columnId?: number;
  parentId?: number;
  size?: "small"
}

function AccDroppableItem(props: IAccAnswersItemProps) {
  const cn = bem("AccDroppableItem");
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
    data: {
      parentId: props.parentId,
      columnId: props.columnId
    }
  });

  return (
    <div ref={setNodeRef} className={cn()}>
      <AccItemWrapper size={props.size} type="answer" border={isOver}>{props.element}</AccItemWrapper>
    </div>
  );
}

export default memo(AccDroppableItem);
