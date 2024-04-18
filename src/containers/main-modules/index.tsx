import MainTasksLayout from "@src/components/main-components/main-tasks-layout";
import MainTask from "@src/components/main-components/main-task";
import Spinner from "@src/components/global/spinner";
import useSelector from "@src/hooks/use-selector";
import { IModule } from "@src/services/store/main/types";
import { memo, useCallback, useLayoutEffect, useState } from "react";
import MainModulesLayout from "@src/components/main-components/main-modules-layout";
import { useNavigate } from "react-router-dom";
import { ModuleStatus, TaskType } from "@src/types";
import useStore from "@src/hooks/use-store";
import { Modal } from "antd";
import ModalTaskResult from "@src/components/modal-components/modal-task-result";

function MainModules() {
  const navigate = useNavigate();
  const store = useStore();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useLayoutEffect(() => {
    store.actions.main.load();
  }, [store]);

  const select = useSelector((state) => ({
    modules: state.main.modules,
    waiting: state.main.waiting,
  }));

  const callbacks = {
    onButtonClick: useCallback(
      async (moduleId: IModule["id"]) => {
        await store.actions.main.changeModuleStatus(moduleId);
      },
      [store]
    ),
    onTaskClick: useCallback(
      async (moduleIndex: number, taskId: number, taskType: TaskType) => {
        store.actions.main.checkFinalTask(moduleIndex, taskId, (isFinal) => {
          let isNav = true;
          if (isFinal) {
          }
          if (isNav) {
            navigate(`task/${taskType}/${taskId}`);
          }
        });
      },
      [navigate, store]
    ),
  };

  // const select2: IModule[] = [
  //   {
  //     id: "mod1",
  //     title: "Модуль 1",
  //     data: [
  //       {
  //         taskId: "1",
  //         taskType: "test",
  //         status: "during",
  //         title: "Тестирование",
  //       },
  //       {
  //         taskId: "1",
  //         taskType: "accordance",
  //         status: "during",
  //         title: "Сопоставление бактерий",
  //       },
  //       {
  //         taskId: "2",
  //         taskType: "accordance",
  //         status: "during",
  //         title: "Бактерии 2",
  //       },
  //       {
  //         taskId: "3",
  //         taskType: "test2",
  //         status: "during",
  //         title: "Тест с множественной выборкой",
  //       },
  //     ],
  //   },
  // ];

  // const select2: IModuleData[] = [
  //   {
  //     id: "mod1",
  //     title: "Модуль 1",
  //     status: "started",
  //     data: [
  //       {
  //         taskId: "1",
  //         taskType: "test",
  //         status: "during",
  //         title: "Тестирование",
  //       },
  //       {
  //         taskId: "task2",
  //         taskType: "test",
  //         title: "Выбери соответствие",
  //         status: "ready",
  //       },
  //       {
  //         taskId: "task3",
  //         taskType: "test",
  //         title: "Сделай еще что нибудь пожалуйста, нам это очень надоо",
  //         status: "ready",
  //       },
  //     ],
  //   },
  //   {
  //     id: "mod2",
  //     title: "Модуль 2",
  //     status: "ready",
  //     data: [
  //       {
  //         taskId: "task4",
  //         taskType: "test",
  //         title: "Тестирование",
  //         status: "ready"
  //       },
  //     ],
  //   },
  //   {
  //     id: "mod3",
  //     title: "Модуль 3",
  //     status: "ready",
  //     data: [
  //       {
  //         taskId: "task5",
  //         taskType: "test",
  //         title: "Тестирование",
  //         status: "ready",
  //       },
  //     ],
  //   },
  // ];

  return (
    <MainModulesLayout>
      <Spinner active={select.waiting}>
        {select.modules.map((module, moduleIndex) => (
          <MainTasksLayout
            key={module.id}
            title={module.name}
            status={module.status}
            loading={select.waiting}
            onButtonClick={() => callbacks.onButtonClick(module.id)}
          >
            {module.tasks.map((task, index) => (
              <MainTask
                link={`/task/${task.type}/${task.id}`}
                key={task.id}
                data={task}
                number={index + 1}
                onClick={(taskId: number, taskType: TaskType) =>
                  callbacks.onTaskClick(moduleIndex, taskId, taskType)
                }
              />
            ))}
          </MainTasksLayout>
        ))}
      </Spinner>
      {/* <Modal open={isOpen} footer={[]} centered closable={false}>
        <ModalTaskResult
          text="Задание завершено"
          onNext={callbacks.onNextTask}
        />
      </Modal> */}
    </MainModulesLayout>
  );
}

export default memo(MainModules);
