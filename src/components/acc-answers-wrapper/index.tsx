import React, { memo } from "react";
import "./style.css";

interface IAccAnswersWrapperProps {
  children: React.ReactNode;
}

function AccAnswersWrapper(props: IAccAnswersWrapperProps) {
  return (
    <div className="AccAnswersWrapper">
      {props.children}
    </div>
  );
}

export default memo(AccAnswersWrapper);
