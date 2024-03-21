import { memo } from "react";
import "./style.css";
import AccDroppableItem from "../acc-droppable-item";
import AccParentItem from "../acc-parent-item";

interface IAccAnswersItemProps {
  parentId: number;
  element?: React.ReactNode
  url: string;
}

function AccAnswersItem(props: IAccAnswersItemProps) {
  return (
    <div className="AccAnswersItem">
      <AccDroppableItem id={props.parentId} element={props.element} />
      <AccParentItem str={props.url}/>
    </div>
  );
}

export default memo(AccAnswersItem);
