import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { Button } from "antd";
import arrowBack from "./arrow-back.svg";

interface ITestTextAnswersProps {
  onClick: (nextQuestion: boolean) => void;
  showLeftButton?: boolean;
  showRightButton?: boolean;
}
function TaskToggle({
  showLeftButton = false,
  showRightButton = false,
  ...props
}: ITestTextAnswersProps) {
  const cn = bem("TaskToggle");

  return (
    <div className={cn()}>
      {showLeftButton && (
        <Button
          className={cn("button")}
          icon={
            <img className={cn("image", { rotate: false })} src={arrowBack} />
          }
          onClick={() => props.onClick(false)}
        >
          Предыдущий вопрос
        </Button>
      )}
      {showRightButton && (
        <Button
          className={cn("button")}
          icon={
            <img className={cn("image", { rotate: true })} src={arrowBack} />
          }
          onClick={() => props.onClick(true)}
        >
          Следующий вопрос
        </Button>
      )}
    </div>
  );
}

export default memo(TaskToggle);
