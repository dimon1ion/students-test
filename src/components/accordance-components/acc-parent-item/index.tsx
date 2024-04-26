import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import ImageScale from "@src/components/global/image-scale";
import { Tooltip } from "antd";

interface IAccParentItemProps {
  value: string;
  prompt?: string;
  value_type: "order" | "string" | "image";
  size?: "small";
}

function AccParentItem(props: IAccParentItemProps) {
  const cn = bem("AccParentItem");
  if (props.value_type === "order") {
    return;
  }
  return (
    <div
      className={cn({
        size: props.size,
        text: props.value_type === "string",
        image: props.value_type === "image",
      })}
    >
      {props.value_type === "image" && (
        <Tooltip title={props.prompt}><ImageScale className={cn("image")} src={props.value} /></Tooltip>
      )}
      {props.value_type === "string" && (
        <div className={cn("text", { size: props.size })}>{props.value}</div>
      )}
    </div>
  );
}

export default memo(AccParentItem);
