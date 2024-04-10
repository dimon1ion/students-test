import ButtonBack from "@src/components/button-back";
import PageLayout from "@src/components/layouts/page-layout";
import LevelWrapper from "@src/components/level-wrapper";
import TaskContentLayout from "@src/components/task-content-layout";
import TaskHeaderLayout from "@src/components/task-header-layout";
import TextButton from "@src/components/text-button";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import React, { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface ITaskLayoutProps {
    children: React.ReactNode;
    title?: string;
}

function TaskLayout({children, title = ""}: ITaskLayoutProps) {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    user: state.session.user,
  }));

  const callbacks = {
    onBackButtonClick: useCallback(() => {
      navigate("/");
    }, [navigate]),
    onTextButtonClick: useCallback(() => {
      store.actions.session.signOut();
    }, [store]),
  };

  return (
    <PageLayout>
      <TaskHeaderLayout>
        <ButtonBack onClick={callbacks.onBackButtonClick} />
        <LevelWrapper title={title}/>
        <TextButton
          text={`${select.user.name} ${select.user.surname}`}
          onClick={callbacks.onTextButtonClick}
          showTextCommand={"Выход"}
        />
      </TaskHeaderLayout>
      <TaskContentLayout>
        {children}
      </TaskContentLayout>
    </PageLayout>
  );
}

export default memo(TaskLayout);
