import { memo } from "react";
import "./style.css";
import { Button } from "antd";

interface IAnswerButtonProps {
  onClick: () => void;
  text: string;
  loading?: boolean;
  disabled?: boolean;
}

function AnswerButton({
  loading = false,
  disabled = false,
  ...props
}: IAnswerButtonProps) {
  return (
    <Button className={"AnswerButton"} type="primary" loading={loading} disabled={disabled} onClick={props.onClick}>
      {props.text}
    </Button>
  );
}

export default memo(AnswerButton);
