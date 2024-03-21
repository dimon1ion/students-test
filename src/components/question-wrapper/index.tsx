import { memo } from "react";
import "./style.css";

interface IQuestionWrapperProps {
  img?: string;
  text: string;
}

function QuestionWrapper(props: IQuestionWrapperProps) {
  return (
    <div className="QuestionWrapper">
      <div className="QuestionWrapper-text">{props.text}</div>
    </div>
  );
}

export default memo(QuestionWrapper);
