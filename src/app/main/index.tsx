import PageLayout from "@src/components/layouts/page-layout";
import { memo } from "react";
import MainContent from "@src/components/main-components/main-content";
import MainModules from "@src/containers/main-modules";
import useTitle from "@src/hooks/use-title";
import MainHeader from "@src/containers/main-header";

function Main() {
  useTitle("Главная");

  return (
    <PageLayout>
      <MainHeader/>
      <MainContent>
        <MainModules />
      </MainContent>
    </PageLayout>
  );
}

export default memo(Main);
