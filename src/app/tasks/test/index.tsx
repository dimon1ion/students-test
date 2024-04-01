import ModalTaskResult from "@src/components/modal-task-result";
import Spinner from "@src/components/spinner";
import TestQuestion from "@src/components/test-question";
import TestTemplate from "@src/components/test-template";
import TaskLayout from "@src/containers/task-layout";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import useTitle from "@src/hooks/use-title";
import {
  IQuestion,
  IQuestionAnswer,
} from "@src/services/store/tasks/test/types";
import { Button, Modal } from "antd";
import { memo, useCallback, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Test() {
  useTitle("Модуль 1 Тестирование");
  const store = useStore();
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useLayoutEffect(() => {
    store.actions.test.load(Number(params.id));
  }, [store, params]);

  const select = useSelector((state) => ({
    questions: state.test.questions,
    answers: state.test.answers,
    waiting: state.test.waiting,
    waitingLoad: state.test.waitingLoad,
    mark: state.test.mark,
  }));

  const callbacks = {
    onChooseAnswer: useCallback(
      (question_id: IQuestion["id"], answer_id: IQuestionAnswer["id"]) => {
        store.actions.test.setAnswer(question_id, answer_id);
      },
      [store]
    ),
    onFinish: useCallback(() => {
      store.actions.test.finishTest(() => {
        setIsOpen(true);
      });
    }, [store]),
    onNextTask: useCallback(() => {
      setIsOpen(false);
      navigate("/");
    }, [navigate]),
  };

  return (
    <TaskLayout>
      <TestTemplate>
        <Spinner active={select.waitingLoad}>
          {select.questions?.map((question, index) => (
            <TestQuestion
              onChooseAnswer={callbacks.onChooseAnswer}
              question={question}
              key={question.id}
              number={index + 1}
            />
          ))}
          {select.questions.length > 0 && (
            <Button
              loading={select.waiting}
              disabled={select.questions.length !== select.answers.length}
              onClick={callbacks.onFinish}
            >
              Завершить тест
            </Button>
          )}
        </Spinner>
        <Modal open={isOpen} footer={[]} centered closable={false}>
          <ModalTaskResult
            text="Задание завершено"
            mark={select.mark === null ? undefined : select.mark}
            onNext={callbacks.onNextTask}
          />
        </Modal>
      </TestTemplate>
    </TaskLayout>
  );
}

export default memo(Test);
