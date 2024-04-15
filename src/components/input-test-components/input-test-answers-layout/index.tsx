import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

interface IInputTestAnswersLayoutProps {
  children: React.ReactNode;
}
function InputTestAnswersLayout(props: IInputTestAnswersLayoutProps) {
  const cn = bem("InputTestAnswersLayout");

  return (
    <div className={cn()}>
      {props.children}
    </div>
  );
}

export default memo(InputTestAnswersLayout);
