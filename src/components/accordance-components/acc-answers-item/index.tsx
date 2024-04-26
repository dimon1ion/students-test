import { memo } from "react";
import "./style.css";
import AccDroppableItem from "../acc-droppable-item";
import AccParentItem from "../acc-parent-item";

interface IAccAnswersItemProps {
  parentId: number;
  element?: React.ReactNode
  value: string;
  prompt?: string;
  value_type: "order" | "string" | "image";
}

function AccAnswersItem(props: IAccAnswersItemProps) {
  return (
    <div className="AccAnswersItem">
      <AccDroppableItem id={props.parentId} element={props.element} />
      <AccParentItem value={props.value} prompt={props.prompt} value_type={props.value_type}/>
    </div>
  );
}

export default memo(AccAnswersItem);
