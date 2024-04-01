import { memo, useCallback } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import {
  IAnswer,
  IQuestion,
  IQuestionAnswer,
} from "@src/services/store/tasks/multiple-test/types";
import TestAnswer from "../test-answer";

interface ITestTextAnswersProps {
  question: IQuestion;
  answers: IAnswer[];
  onSelect: (question: IQuestion, answerId: IQuestionAnswer["id"]) => void
}
function TestTextAnswers(props: ITestTextAnswersProps) {
  const cn = bem("TestTextAnswers");

  const callbacks = {
    onClick: useCallback((answer: IQuestionAnswer["id"]) => {
      props.onSelect(props.question, answer);
    }, [props.question]),
  }

  return (
    <div className={cn({ type: props.question.answerType })}>
      {props.question.answers.map((answer) => (
        <TestAnswer
          key={answer.id}
          type={props.question.answerType}
          value={answer.text}
          selected={
            props.answers.findIndex(
              (result) =>
                result.answersIds.includes(answer.id) &&
                result.question_id === props.question.id
            ) !== -1
          }
          showCheckbox={props.question.multiple}
          onClick={() => callbacks.onClick(answer.id)}
        />
      ))}
    </div>
  );
}

export default memo(TestTextAnswers);
