import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import {
  IQuestion,
  IQuestionAnswer,
} from "@src/services/store/tasks/test/types";
import { Radio, RadioChangeEvent, Space } from "antd";

interface TestQuestionProps {
  question: IQuestion;
  number?: number;
  onChooseAnswer: (
    question_id: IQuestion["id"],
    answer_id: IQuestionAnswer["id"]
  ) => void;
}

function TestQuestion(props: TestQuestionProps) {
  const cn = bem("TestQuestion");

  const callbacks = {
    onChangeValue: (e: RadioChangeEvent) => {
      props.onChooseAnswer(props.question.id, e.target.value);
    },
  };

  return (
    <div className={cn()}>
      <div className={cn("question")}>
        {props.number ? `${props.number}. ` : ""}
        {props.question.question_text}
      </div>
      <Radio.Group className={cn("answers")} onChange={callbacks.onChangeValue}>
        <Space direction="vertical">
          {props.question.answers.map((answer) => (
            <Radio key={answer.id} className={cn("answer")} value={answer.id}>
              {answer.answer_text}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </div>
  );
}

export default memo(TestQuestion);
