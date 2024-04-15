import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

interface IAccParentItemProps {
  value: string,
  value_type: "order" | "string" | "image";
  size?: "small";
}

function AccParentItem(props: IAccParentItemProps) {
  const cn = bem("AccParentItem");
  if (props.value_type === "order") {
    return;
  }
  return (
    <div className={cn({size: props.size, text: props.value_type === "string"})}>
      {props.value_type === "image" && <img className={cn("image")} src={props.value}/>}
      {props.value_type === "string" && <div className={cn("text", {size: props.size})}>{props.value}</div>}
    </div>
  );
}

export default memo(AccParentItem);
