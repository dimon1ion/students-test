import { memo } from "react";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import ImageScale from "../global/image-scale";

interface IQuestionWrapperProps {
  img?: string | undefined | null;
  text: string;
}

function QuestionWrapper(props: IQuestionWrapperProps) {
  const cn = bem("QuestionWrapper");

  return (
    <div className={cn()}>
      {props.img && (
        <div className={cn("imageBlock")}>
          <ImageScale
            src={props.img}
            className={cn("image")}
          />
        </div>
      )}
      <div className={cn("text")}>{props.text}</div>
    </div>
  );
}

export default memo(QuestionWrapper);
