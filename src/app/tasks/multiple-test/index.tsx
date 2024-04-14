import AnswerButton from "@src/components/global/answer-button";
import LeftSideTaskTemplate from "@src/components/task-components/left-side-task-template";
import ModalTaskResult from "@src/components/modal-components/modal-task-result";
import QuestionWrapper from "@src/components/question-wrapper";
import Spinner from "@src/components/global/spinner";
import TaskToggle from "@src/components/task-components/task-toggle";
import TestLayout from "@src/components/test-components/test-layout";
import TestRightSideLayout from "@src/components/test-components/test-right-side-layout";
import TestTextAnswers from "@src/components/test-components/test-text-answers";
import TaskLayout from "@src/containers/task-layout";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import useTitle from "@src/hooks/use-title";
import {
  IQuestion,
  IQuestionAnswer,
} from "@src/services/store/tasks/multiple-test/types";
import { Modal } from "antd";
import { memo, useCallback, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MultipleTest() {
  const store = useStore();
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useLayoutEffect(() => {
    store.actions.multiTest.load(Number(params.id), () => {
      navigate("/");
    });
  }, [store, params]);

  const select = useSelector((state) => ({
    title: state.multiTest.title,
    questions: state.multiTest.questions,
    answers: state.multiTest.answers,
    activeQuestion: state.multiTest.activeQuestion,
    waiting: state.multiTest.waiting,
    waitingLoad: state.multiTest.waitingLoad,
    mark: state.multiTest.mark,
  }));
  useTitle(select.title);

  const callbacks = {
    onChooseAnswer: useCallback(
      (question: IQuestion, answerId: IQuestionAnswer["id"]) => {
        store.actions.multiTest.setAnswer(question, answerId);
      },
      [store]
    ),
    onFinish: useCallback(() => {
      store.actions.multiTest.finishTest(() => {
        setIsOpen(true);
      });
    }, [store]),
    onNextTask: useCallback(() => {
      setIsOpen(false);
      navigate("/");
    }, [navigate]),
    onChangeQuestion: useCallback(
      (nextQuestion: boolean) => {
        store.actions.multiTest.changeQuestion(nextQuestion);
      },
      [store]
    ),
  };

  return (
    <TaskLayout title={select.title}>
      <Spinner active={select.waitingLoad}>
        <TestLayout>
          {select.activeQuestion && (
            <LeftSideTaskTemplate>
              <QuestionWrapper
                text={select.activeQuestion.question.text}
                img={select.activeQuestion.question.image}
              />
              <TaskToggle
                onClick={callbacks.onChangeQuestion}
                showLeftButton={select.activeQuestion.index - 1 >= 0}
                showRightButton={
                  select.activeQuestion.index + 1 < select.questions.length
                }
              />
              <AnswerButton
                text="Ответить"
                loading={select.waiting}
                disabled={select.questions.length !== select.answers.length}
                onClick={callbacks.onFinish}
              />
            </LeftSideTaskTemplate>
          )}
          {select.activeQuestion && (
            <TestRightSideLayout>
              <TestTextAnswers
                question={select.activeQuestion.question}
                answers={select.answers}
                onSelect={callbacks.onChooseAnswer}
              />
            </TestRightSideLayout>
          )}
        </TestLayout>
      </Spinner>
      <Modal open={isOpen} footer={[]} centered>
        <ModalTaskResult
          text="Задание завершено"
          mark={select.mark === null ? undefined : select.mark}
          onNext={callbacks.onNextTask}
        />
      </Modal>
    </TaskLayout>
  );
}

export default memo(MultipleTest);
