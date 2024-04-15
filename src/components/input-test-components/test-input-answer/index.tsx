import { memo, useState } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { IAnswer } from "@src/services/store/tasks/input-test/types";
import { Card, Tooltip } from "antd";
import ImageScale from "@src/components/global/image-scale";
import helpIcon from "./help-icon.svg";

interface ITestInputAnswerProps {
  image?: string;
  value?: string;
  prompt?: string;
  onChange: (student_answer: IAnswer["student_answer"]) => void;
}
function TestInputAnswer(props: ITestInputAnswerProps) {
  const cn = bem("TestInputAnswer");
  const [value, setValue] = useState(props.value ?? "");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    props.onChange(event.target.value);
  }

  return (
    <div className={cn()}>
        {props.prompt && <Tooltip title={props.prompt}><img src={helpIcon} className={cn("helpIcon")}/></Tooltip>}
      <Card cover={props.image && <ImageScale src={props.image} className={cn("image")}/>}>
        <input value={value} type="text" onChange={onChange} className={cn("input")}/>
      </Card>
    </div>
  );
}

export default memo(TestInputAnswer);
