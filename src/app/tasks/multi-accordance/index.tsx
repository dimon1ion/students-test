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
import React, {
  memo,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import MultiAccRightHead from "@src/components/multi-accordance-components/multi-acc-right-head";
import MultiAccAnswersItem from "@src/components/multi-accordance-components/multi-acc-answers-item";
import {
  IPortable,
  IResult,
} from "@src/services/store/tasks/multi-accordance/types";

function Accordance() {
  const store = useStore();
  const [activeId, setActiveId] = useState<number | null>(null);
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useLayoutEffect(() => {
    store.actions.multiAccordance.load(Number(params.id), () => {
      navigate("/*", { replace: true });
    });
  }, [store, params]);

  const select = useSelector((state) => ({
    title: state.multiAccordance.description,
    accordances: state.multiAccordance.accordances,
    portables: state.multiAccordance.portables,
    columns_name: state.multiAccordance.columns_name,
    columns: state.multiAccordance.columns,
    results: state.multiAccordance.result,
    waiting: state.multiAccordance.waiting,
    mark: state.multiAccordance.mark,
    waitingLoad: state.multiAccordance.waitingLoad,
  }));
  useTitle(select.title);

  const callbacks = {
    handleDragEnd: useCallback(
      (event: DragEndEvent) => {
        setActiveId(null);
        store.actions.multiAccordance.setResult(
          Number(event.active.id),
          event.over?.data.current?.parentId
            ? Number(event.over.data.current.parentId)
            : null,
          event.over?.data.current?.columnId
            ? Number(event.over.data.current.columnId)
            : null
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
      store.actions.multiAccordance.finishAccordance(() => {
        setIsOpen(true);
      });
    }, [store]),
    onNextTask: useCallback(() => {
      setIsOpen(false);
      navigate("/");
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
          size="small"
          id={found.id}
          data={{ value: found.value, value_type: found.value_type }}
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
              <QuestionWrapper text={select.title} />
              <AnswerButton
                text="Ответить"
                onClick={callbacks.onFinish}
                loading={select.waiting}
                disabled={
                  select.results.length !==
                  select.accordances.length * select.columns.length
                }
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
                  <AccItemWrapper size="small" type="variant" key={item.id}>
                    {select.results?.findIndex(
                      (result) => result.portableId === item.id
                    ) == -1 && (
                      <AccDraggableItem
                        id={item.id}
                        data={{
                          value: item.value,
                          value_type: item.value_type,
                        }}
                        size="small"
                        show={true}
                      />
                    )}
                  </AccItemWrapper>
                ))}
                {/* конец */}
              </AccordanceOptions>
              {select.accordances?.length > 0 && (
                <AccAnswersWrapper>
                  <MultiAccRightHead columns={select.columns} columnsName={select.columns_name}/>
                  {select.accordances?.map((accordance) => {
                    const result: IResult[] = [];
                    select.results?.forEach((item) => {
                      if (item.accordanceId == accordance.id) {
                        result.push(item);
                      }
                    });
                    let items: { portable: IPortable; columnId: number }[] = [];
                    if (result.length > 0) {
                      result.forEach((element) => {
                        select.portables?.map((item) => {
                          if (item.id == element.portableId) {
                            items.push({
                              portable: item,
                              columnId: element.columnId,
                            });
                          }
                        });
                      });
                    }
                    let elements: {
                      element: React.ReactNode;
                      columnId: number;
                    }[] = [];
                    items.forEach((item) => {
                      elements.push({
                        element: (
                          <AccDraggableItem
                            id={item.portable.id}
                            data={{
                              value: item.portable.value,
                              value_type: item.portable.value_type,
                            }}
                            size="small"
                            show
                          />
                        ),
                        columnId: item.columnId,
                      });
                    });
                    return (
                      <MultiAccAnswersItem
                        parentId={accordance.id}
                        key={accordance.id}
                        elements={elements}
                        columns={select.columns}
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
