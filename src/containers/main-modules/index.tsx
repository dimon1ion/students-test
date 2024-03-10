import MainTasksLayout from "@src/components/main-tasks-layout";
import MainTask from "@src/components/main-task";
import Spinner from "@src/components/spinner";
import useSelector from "@src/hooks/use-selector";
import { IModuleData } from "@src/services/store/main/types";
import { memo, useCallback } from "react";
import MainModulesLayout from "@src/components/main-modules-layout";
import { useNavigate } from "react-router-dom";
import { ModuleStatus, TaskType } from "@src/types";

function MainModules() {
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    modules: state.main.list,
    waiting: state.main.waiting,
  }));

  const callbacks = {
    onButtonClick: useCallback((status: ModuleStatus) => {},
    []),
    onTaskClick: useCallback((taskId: number | string, taskType: TaskType) => {
      navigate(`${taskType}/${taskId}`);
    }, [navigate]),
  };

  const select2: IModuleData[] = [
    {
      id: "mod1",
      title: "Модуль 1",
      status: "started",
      data: [
        {
          taskId: "1",
          taskType: "test",
          status: "during",
          title: "Тестирование",
        },
        {
          taskId: "task2",
          taskType: "test",
          title: "Выбери соответствие",
          status: "ready",
        },
        {
          taskId: "task3",
          taskType: "test",
          title: "Сделай еще что нибудь пожалуйста, нам это очень надоо",
          status: "ready",
        },
      ],
    },
    {
      id: "mod2",
      title: "Модуль 2",
      status: "ready",
      data: [
        {
          taskId: "task4",
          taskType: "test",
          title: "Тестирование",
          status: "ready"
        },
      ],
    },
    {
      id: "mod3",
      title: "Модуль 3",
      status: "ready",
      data: [
        {
          taskId: "task5",
          taskType: "test",
          title: "Тестирование",
          status: "ready",
        },
      ],
    },
  ];

  return (
    <MainModulesLayout>
      <Spinner active={select.waiting}>
        {select2.map((module) => (
          <MainTasksLayout
            key={module.id}
            title={module.title}
            status={module.status}
            onButtonClick={callbacks.onButtonClick}
          >
            {module.data.map((test, index) => (
              <MainTask key={test.taskId} data={test} number={index + 1} />
            ))}
          </MainTasksLayout>
        ))}
      </Spinner>
    </MainModulesLayout>
  );
}

export default memo(MainModules);
