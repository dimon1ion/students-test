import MainTasksLayout from "@src/components/main-tasks-layout";
import MainTask from "@src/components/main-task";
import Spinner from "@src/components/spinner";
import useSelector from "@src/hooks/use-selector";
import { IModule } from "@src/services/store/main/types";
import { memo, useCallback, useLayoutEffect } from "react";
import MainModulesLayout from "@src/components/main-modules-layout";
import { useNavigate } from "react-router-dom";
import { ModuleStatus, TaskType } from "@src/types";
import useStore from "@src/hooks/use-store";

function MainModules() {
  const navigate = useNavigate();
  const store = useStore();

  useLayoutEffect(() => {
    store.actions.main.load();
  }, [store]);

  const select = useSelector((state) => ({
    modules: state.main.modules,
    waiting: state.main.waiting,
  }));

  const callbacks = {
    onButtonClick: useCallback(async (moduleId: IModule["id"]) => {
      await store.actions.main.changeModuleStatus(moduleId)
    }, [store]),
    onTaskClick: useCallback((taskId: number | string, taskType: TaskType) => {
        navigate(`task/${taskType}/${taskId}`);
      },
      [navigate]
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
        {select.modules.map((module) => (
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
                onClick={callbacks.onTaskClick}
              />
            ))}
          </MainTasksLayout>
        ))}
      </Spinner>
    </MainModulesLayout>
  );
}

export default memo(MainModules);
