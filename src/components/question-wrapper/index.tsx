import { memo } from "react";
import "./style.css";
import { Image } from "antd";
import { cn as bem } from "@bem-react/classname";
import fullIcon from "./full.svg";

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
          <Image src={props.img} className={cn("image")} preview={{mask: <img src={fullIcon} className={cn("imageMask")}></img>}}/>
        </div>
      )}
      <div className={cn("text")}>{props.text}</div>
    </div>
  );
}

export default memo(QuestionWrapper);
