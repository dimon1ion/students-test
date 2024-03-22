import {
  DndContext,
  DragEndEvent,
  DragOverlay,
} from "@dnd-kit/core";
import AccAnswersItem from "@src/components/acc-answers-item";
import AccAnswersWrapper from "@src/components/acc-answers-wrapper";
import AccDraggableItem from "@src/components/acc-draggable-item";
import AccItemWrapper from "@src/components/acc-item-wrapper";
import AccordanceOptions from "@src/components/accordance-options";
import AccordanceTemplate from "@src/components/accordance-template";
import AnswerButton from "@src/components/answer-button";
import LeftSideTaskTemplate from "@src/components/left-side-task-template";
import QuestionWrapper from "@src/components/question-wrapper";
import RightSideTaskTemplate from "@src/components/right-side-task-template";
import Spinner from "@src/components/spinner";
import TaskLayout from "@src/containers/task-layout";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import useTitle from "@src/hooks/use-title";
import { memo, useCallback, useLayoutEffect, useMemo, useState } from "react";

function Accordance() {
  useTitle("Модуль 1 Сопоставление");
  const store = useStore();
  const [activeId, setActiveId] = useState<number | null>(null);

  useLayoutEffect(() => {
    store.actions.accordance.load(1, 1);
  }, [store]);

  const select = useSelector((state) => ({
    title: state.accordance.title,
    parents: state.accordance.parents,
    answers: state.accordance.answers,
    results: state.accordance.result,
    waiting: state.accordance.waiting,
  }));

  const callbacks = {
    handleDragEnd: useCallback(
      (event: DragEndEvent) => {
        setActiveId(null);
        console.log(event);
        store.actions.accordance.setResult(
          Number(event.active.id),
          event.over === null ? null : Number(event.over.id)
        );
      },
      [store, setActiveId]
    ),
    handleDragStart: useCallback((event: DragEndEvent) => {
      console.log(event.active.id)
      setActiveId(Number(event.active.id));
    }, [setActiveId]),
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
      const found = select.answers?.find((item) => item.id === activeId);
      if (!found) {
        return;
      }
      return (
        <AccDraggableItem
          id={found.id}
          data={{ str: found.text, type: "text" }}
          show
        />
      );
    }, [activeId, select.answers]),
  };

  return (
    <TaskLayout>
      <AccordanceTemplate>
        <Spinner active={select.waiting}>
          {select.title && (
            <LeftSideTaskTemplate>
              <QuestionWrapper text={select.title} />
              <AnswerButton text="Ответить" onClick={() => {}} />
            </LeftSideTaskTemplate>
          )}
          <DndContext
            onDragEnd={callbacks.handleDragEnd}
            onDragStart={callbacks.handleDragStart}
          >
            <RightSideTaskTemplate>
              <AccordanceOptions>
                {/* Элементы */}
                {select.answers?.map((item) => (
                  <AccItemWrapper type="variant" key={item.id}>
                    <AccDraggableItem
                      id={item.id}
                      data={{ str: item.text, type: "text" }}
                      show={
                        select.results?.findIndex(
                          (result) => result.answerId === item.id
                        ) == -1
                      }
                    />
                  </AccItemWrapper>
                ))}
                {/* конец */}
              </AccordanceOptions>
              <AccAnswersWrapper>
                {select.parents?.map((parent) => {
                  const result = select.results?.find(
                    (result) => result.parentId == parent.id
                  );
                  let item = undefined;
                  if (result !== undefined) {
                    item = select.answers?.find(
                      (item) => item.id == result.answerId
                    );
                  }
                  let element = undefined;
                  if (item) {
                    element = (
                      <AccDraggableItem
                        id={item.id}
                        data={{ str: item.text, type: "text" }}
                        show
                      />
                    );
                  }
                  return (
                    <AccAnswersItem
                      parentId={parent.id}
                      key={parent.id}
                      element={element}
                      url={parent.url}
                    />
                  );
                })}
              </AccAnswersWrapper>
            <DragOverlay>{options.activeOverlay}</DragOverlay>
            </RightSideTaskTemplate>
          </DndContext>
        </Spinner>
      </AccordanceTemplate>
    </TaskLayout>
  );
}

export default memo(Accordance);
