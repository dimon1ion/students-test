import { memo } from "react";
import "./style.css";

interface IAccParentItemProps {
  value: string,
  value_type: "order" | "string" | "image";
}

function AccParentItem(props: IAccParentItemProps) {
  if (props.value_type === "order") {
    return;
  }
  return (
    <div className="AccParentItem">
      {props.value_type === "image" && <img className={"AccParentItem-image"} src={props.value}/>}
      {props.value_type === "string" && <div className={"AccParentItem-text"}>{props.value}</div>}
    </div>
  );
}

export default memo(AccParentItem);
