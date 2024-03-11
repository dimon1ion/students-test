import Spinner from "@src/components/spinner";
import TestQuestion from "@src/components/test-question";
import TestTemplate from "@src/components/test-template";
import useInit from "@src/hooks/use-init";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import useTitle from "@src/hooks/use-title";
import {
  IQuestion,
  IQuestionAnswer,
} from "@src/services/store/tasks/test/types";
import { Button } from "antd";
import { memo, useCallback, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";

function Test() {
  useTitle("Модуль 1 Тестирование");
  const store = useStore();
  const params = useParams<{ id: string }>();

  useLayoutEffect(() => {
    store.actions.test.load(Number(params.id));
  }, [store, params]);

  const select = useSelector((state) => ({
    questions: state.test.questions,
    answers: state.test.answers,
    waiting: state.test.waiting,
  }));

  const callbacks = {
    onChooseAnswer: useCallback(
      (question_id: IQuestion["id"], answer_id: IQuestionAnswer["id"]) => {
        store.actions.test.setAnswer(question_id, answer_id);
      },
      [store]
    ),
  };

  return (
    <TestTemplate>
      <Spinner active={select.waiting}>
        {select.questions?.map((question, index) => (
          <TestQuestion
            onChooseAnswer={callbacks.onChooseAnswer}
            question={question}
            key={question.id}
            number={index + 1}
          />
        ))}
        {select.questions.length > 0 && (
          <Button loading={select.waiting} disabled={select.questions.length !== select.answers.length}>
            Завершить тест
          </Button>
        )}
      </Spinner>
    </TestTemplate>
  );
}

export default memo(Test);
