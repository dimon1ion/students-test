import PageLayout from "@src/components/layouts/page-layout";
import { memo } from "react";
import MainContent from "@src/components/main-components/main-content";
import useTitle from "@src/hooks/use-title";
import MainHeader from "@src/containers/main-header";
import Results from "@src/containers/results";

function Result() {
  useTitle("Результаты");

  return (
    <PageLayout>
      <MainHeader/>
      <MainContent>
        <Results/>
      </MainContent>
    </PageLayout>
  );
}

export default memo(Result);
