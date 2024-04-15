import AnswerButton from "@src/components/global/answer-button";
import LeftSideTaskTemplate from "@src/components/task-components/left-side-task-template";
import ModalTaskResult from "@src/components/modal-components/modal-task-result";
import QuestionWrapper from "@src/components/question-wrapper";
import Spinner from "@src/components/global/spinner";
import TestLayout from "@src/components/test-components/test-layout";
import TestRightSideLayout from "@src/components/test-components/test-right-side-layout";
import TaskLayout from "@src/containers/task-layout";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import useTitle from "@src/hooks/use-title";
import { Modal } from "antd";
import { memo, useCallback, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputTestAnswersLayout from "@src/components/input-test-components/input-test-answers-layout";
import TestInputAnswer from "@src/components/input-test-components/test-input-answer";
import { IAnswer } from "@src/services/store/tasks/input-test/types";

function InputTest() {
  const store = useStore();
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useLayoutEffect(() => {
    store.actions.inputTest.load(Number(params.id), () => {
      navigate("/");
    });
  }, [store, params]);

  const select = useSelector((state) => ({
    description: state.inputTest.description,
    taskImage: state.inputTest.task_image,
    questions: state.inputTest.questions,
    answers: state.inputTest.answers,
    waiting: state.inputTest.waiting,
    waitingLoad: state.inputTest.waitingLoad,
    mark: state.inputTest.mark,
  }));
  useTitle(select.description);

  const callbacks = {
    onChooseAnswer: useCallback(
      (questionId: IAnswer["question_id"], studentAnswer: IAnswer["student_answer"]) => {
        store.actions.inputTest.setAnswer(questionId, studentAnswer);
      },
      [store]
    ),
    onFinish: useCallback(() => {
      store.actions.inputTest.finishTest(() => {
        setIsOpen(true);
      });
    }, [store]),
    onNextTask: useCallback(() => {
      setIsOpen(false);
      navigate("/");
    }, [navigate]),
  };

  return (
    <TaskLayout title={select.description}>
      <Spinner active={select.waitingLoad}>
        <TestLayout>
          {!select.waitingLoad && (
            <LeftSideTaskTemplate>
              <QuestionWrapper
                text={select.description}
                img={select.taskImage}
              />
              <AnswerButton
                text="Ответить"
                loading={select.waiting}
                disabled={select.questions.length !== select.answers.length}
                onClick={callbacks.onFinish}
              />
            </LeftSideTaskTemplate>
          )}
          <TestRightSideLayout>
            <InputTestAnswersLayout>
              {select.questions.map((answer) => (
                <TestInputAnswer
                  key={answer.id}
                  image={answer.image}
                  prompt={answer.prompt}
                  onChange={(value: IAnswer["student_answer"]) => callbacks.onChooseAnswer(answer.id, value)}
                />
              ))}
            </InputTestAnswersLayout>
          </TestRightSideLayout>
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

export default memo(InputTest);
