import React, { memo } from "react";
import "./style.css";

interface IAccParentItemProps {
  str: string,
}

function AccParentItem(props: IAccParentItemProps) {
  console.log(props.str);
  return (
    <div className="AccParentItem">
      <img className={"AccParentItem-image"} src={props.str}/>
    </div>
  );
}

export default memo(AccParentItem);
