import React, { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { Button, Empty, Table, TableProps } from "antd";
import empty from "./empty.svg";

type IResultTableProps = {
  onEmptyButtonClick: () => void;
} & TableProps
function ResultTable({onEmptyButtonClick = () => {}, ...props}: IResultTableProps) {
  const cn = bem("ResultTable");

  return (
    <Table
      locale={{
        emptyText: (
          <Empty
            image={empty}
            imageStyle={{ height: 60 }}
            description={
              <span>
                Нет результатов
              </span>
            }
          >
            <Button onClick={onEmptyButtonClick}>Пройти модуль</Button>
          </Empty>
        ),
      }}
      {...props}
      className={cn()}
      rowClassName={cn("row")}
    />
  );
}

export default memo(ResultTable);
