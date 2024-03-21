import React, { memo } from "react";
import { cn as bem, cn } from "@bem-react/classname";
import "./style.css";
import AccItemWrapper from "../acc-item-wrapper";
import { useDroppable } from "@dnd-kit/core";

interface IAccAnswersItemProps {
  id: number;
  element?: React.ReactNode;
}

function AccDroppableItem(props: IAccAnswersItemProps) {
  const cn = bem("AccDroppableItem");
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  return (
    <div ref={setNodeRef} className={cn()}>
      <AccItemWrapper type="answer" border={isOver}>{props.element}</AccItemWrapper>
    </div>
  );
}

export default memo(AccDroppableItem);
