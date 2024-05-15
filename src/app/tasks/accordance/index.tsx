import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import AccAnswersItem from "@src/components/accordance-components/acc-answers-item";
import AccAnswersWrapper from "@src/components/accordance-components/acc-answers-wrapper";
import AccDraggableItem from "@src/components/accordance-components/acc-draggable-item";
import AccItemWrapper from "@src/components/accordance-components/acc-item-wrapper";
import AccordanceOptions from "@src/components/accordance-components/accordance-options";
import AccordanceTemplate from "@src/components/accordance-components/accordance-template";
import AnswerButton from "@src/components/global/answer-button";
import LeftSideTaskTemplate from "@src/components/task-components/left-side-task-template";
import ModalTaskResult from "@src/components/modal-components/modal-task-result";
import QuestionWrapper from "@src/components/question-wrapper";
import RightSideTaskTemplate from "@src/components/task-components/right-side-task-template";
import Spinner from "@src/components/global/spinner";
import TaskLayout from "@src/containers/task-layout";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import useTitle from "@src/hooks/use-title";
import { Modal } from "antd";
import { memo, useCallback, useLayoutEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Accordance() {
  const store = useStore();
  const [activeId, setActiveId] = useState<number | null>(null);
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useLayoutEffect(() => {
    store.actions.accordance.load(Number(params.id), () => {
      navigate("/*", { replace: true });
    });
  }, [store, params]);

  const select = useSelector((state) => ({
    title: state.accordance.description,
    image: state.accordance.image,
    accordances: state.accordance.accordances,
    portables: state.accordance.portables,
    results: state.accordance.result,
    waiting: state.accordance.waiting,
    mark: state.accordance.mark,
    waitingLoad: state.accordance.waitingLoad,
  }));
  useTitle(select.title);

  const callbacks = {
    handleDragEnd: useCallback(
      (event: DragEndEvent) => {
        setActiveId(null);
        store.actions.accordance.setResult(
          Number(event.active.id),
          event.over === null ? null : Number(event.over.id)
        );
      },
      [store, setActiveId]
    ),
    handleDragStart: useCallback(
      (event: DragEndEvent) => {
        setActiveId(Number(event.active.id));
      },
      [setActiveId]
    ),
    onFinish: useCallback(() => {
      store.actions.accordance.finishAccordance(() => {
        setIsOpen(true);
      }, Number(params.id));
    }, [store]),
    onNextTask: useCallback(() => {
      setIsOpen(false);
      navigate("/");
    }, [navigate]),
    onResultNav: useCallback(() => {
      setIsOpen(false);
      navigate("/results");
    }, [navigate]),
  };

  const options = {
    // draggableItems: useMemo(() => {
    //   return select.answers?.map((item) => (
    //     <AccDraggableItem
    //       id={item.id}
    //       key={item.id}
    //       data={{ str: item.text, type: "text" }}
    //       show
    //     />
    //   ));
    // }, [select.answers]),
    activeOverlay: useMemo(() => {
      if (activeId === null) {
        return;
      }
      const found = select.portables?.find((item) => item.id === activeId);
      if (!found) {
        return;
      }
      return (
        <AccDraggableItem
          id={found.id}
          data={{ value: found.value, value_type: found.value_type, prompt: found.prompt }}
          showPrompt={false}
          show
        />
      );
    }, [activeId, select.portables]),
  };

  return (
    <TaskLayout title={select.title}>
      <AccordanceTemplate>
        <Spinner active={select.waitingLoad}>
          {select.title && (
            <LeftSideTaskTemplate>
              <QuestionWrapper text={select.title} img={select.image}/>
              <AnswerButton
                text="Ответить"
                onClick={callbacks.onFinish}
                loading={select.waiting}
                disabled={select.results.length !== select.accordances.length}
              />
            </LeftSideTaskTemplate>
          )}
          <DndContext
            onDragEnd={callbacks.handleDragEnd}
            onDragStart={callbacks.handleDragStart}
          >
            <RightSideTaskTemplate>
              <AccordanceOptions>
                {/* Элементы */}
                {select.portables?.map((item) => (
                  <AccItemWrapper type="variant" key={item.id}>
                    {select.results?.findIndex(
                      (result) => result.portableId === item.id
                    ) == -1 && (
                      <AccDraggableItem
                        id={item.id}
                        data={{
                          value: item.value,
                          value_type: item.value_type,
                          prompt: item.prompt
                        }}
                        show={true}
                      />
                    )}
                  </AccItemWrapper>
                ))}
                {/* конец */}
              </AccordanceOptions>
              {select.accordances?.length > 0 && (
                <AccAnswersWrapper>
                  {select.accordances?.map((accordance) => {
                    const result = select.results?.find(
                      (result) => result.accordanceId == accordance.id
                    );
                    let item = undefined;
                    if (result !== undefined) {
                      item = select.portables?.find(
                        (item) => item.id == result.portableId
                      );
                    }
                    let element = undefined;
                    if (item) {
                      element = (
                        <AccDraggableItem
                          id={item.id}
                          data={{
                            value: item.value,
                            value_type: item.value_type,
                            prompt: item.prompt
                          }}
                          show
                        />
                      );
                    }
                    return (
                      <AccAnswersItem
                        parentId={accordance.id}
                        key={accordance.id}
                        element={element}
                        prompt={accordance.prompt}
                        value={accordance.value}
                        value_type={accordance.value_type}
                      />
                    );
                  })}
                </AccAnswersWrapper>
              )}

              <DragOverlay>{options.activeOverlay}</DragOverlay>
            </RightSideTaskTemplate>
          </DndContext>
        </Spinner>
        <Modal open={isOpen} footer={[]} centered closable={false}>
          <ModalTaskResult
            text="Задание завершено"
            mark={select.mark === null ? undefined : select.mark}
            onNext={callbacks.onNextTask}
          />
        </Modal>
      </AccordanceTemplate>
    </TaskLayout>
  );
}

export default memo(Accordance);
