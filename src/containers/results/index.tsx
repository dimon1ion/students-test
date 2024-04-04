import { memo, useCallback, useMemo } from "react";
import useTitle from "@src/hooks/use-title";
import ResultLayout from "@src/components/result-layout";
import ResultUserInfo from "@src/components/result-user-info";
import useSelector from "@src/hooks/use-selector";
import { Table, TableColumnsType } from "antd";
import ResultTableLayout from "@src/components/result-table-layout";
import useInit from "@src/hooks/use-init";
import useStore from "@src/hooks/use-store";
import ResultTable from "@src/components/result-table";
import Spinner from "@src/components/spinner";
import { useNavigate } from "react-router-dom";

interface ModulesDataType {
  key: React.Key;
  name: string;
  score: number;
  tasks: [] | undefined;
}

interface ExpandedTasksDataType {
  key: React.Key;
  name: string;
  score: number;
}

function Results() {
  useTitle("Результаты");
  const store = useStore();
  const navigate = useNavigate();

  useInit(() => {
    store.actions.results.load();
  }, [store]);

  const select = useSelector((state) => ({
    name: state.session.user.name,
    surname: state.session.user.surname,
    data: state.results.data,
    waiting: state.results.waiting,
  }));

  const callbacks = {
    onEmptyButtonClick: useCallback(() => {
      navigate("/");
    }, [navigate])
  }

  const options = {
    columns: useMemo<TableColumnsType<ModulesDataType>>(() => {
      return [
        { title: "Модуль", dataIndex: "name" },
        { title: "Баллы", dataIndex: "score" },
      ];
    }, []),
    modulesData: useMemo<ModulesDataType[]>(() => {
      return select.data.map((module) => {
        return {
          key: module.id,
          name: module.module.name,
          score: module.score,
          tasks: undefined,
        };
      });
    }, [select]),
  };

  return (
    <ResultLayout>
      <Spinner active={select.waiting}>
        <ResultUserInfo
          title={`${select.name} ${select.surname}`}
          stats={{ modules: select.data.length }}
        />
        <ResultTableLayout>
          <ResultTable
            loading={select.waiting}
            columns={options.columns}
            // expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
            dataSource={options.modulesData}
            size="large"
            pagination={false}
            onEmptyButtonClick={callbacks.onEmptyButtonClick}
          />
        </ResultTableLayout>
      </Spinner>
    </ResultLayout>
  );
}

export default memo(Results);
