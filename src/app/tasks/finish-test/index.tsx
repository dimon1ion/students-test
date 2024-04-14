import ModalTaskResult from "@src/components/modal-components/modal-task-result";
import Spinner from "@src/components/global/spinner";
import TestQuestion from "@src/components/test-components/test-question";
import TestTemplate from "@src/components/test-components/test-template";
import TaskLayout from "@src/containers/task-layout";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import useTitle from "@src/hooks/use-title";
import {
  IQuestion,
  IQuestionAnswer,
} from "@src/services/store/tasks/finish-test/types";
import { Button, Modal } from "antd";
import { memo, useCallback, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Test() {
  const store = useStore();
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useLayoutEffect(() => {
    store.actions.finishTest.load(Number(params.id), () => {
      navigate("/");
    });
  }, [store, params]);

  const select = useSelector((state) => ({
    questions: state.finishTest.questions,
    answers: state.finishTest.answers,
    waiting: state.finishTest.waiting,
    waitingLoad: state.finishTest.waitingLoad,
    mark: state.finishTest.mark,
  }));
  useTitle("Финальный тест модуля");

  const callbacks = {
    onChooseAnswer: useCallback(
      (question_id: IQuestion["id"], answer_id: IQuestionAnswer["id"]) => {
        store.actions.finishTest.setAnswer(question_id, answer_id);
      },
      [store]
    ),
    onFinish: useCallback(() => {
      store.actions.finishTest.finishTest(() => {
        setIsOpen(true);
      });
    }, [store]),
    onNextTask: useCallback(() => {
      setIsOpen(false);
      navigate("/");
    }, [navigate]),
  };

  return (
    <TaskLayout title="Финальный тест модуля">
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
