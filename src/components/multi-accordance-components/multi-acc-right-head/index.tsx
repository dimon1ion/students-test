import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { IColumn } from "@src/services/store/tasks/multi-accordance/types";

interface IMultiAccRightHeadProps {
  columns: IColumn[];
  columnsName?: string;
}

function MultiAccRightHead(props: IMultiAccRightHeadProps) {
  const cn = bem("MultiAccRightHead");

  return (
    <div className={cn()}>
      {props.columns.map((column) => (
        <div key={column.id} className={cn("item")}>
          {column.name}
        </div>
      ))}
      <div className={cn("item")}>{props.columnsName}</div>
    </div>
  );
}

export default memo(MultiAccRightHead);
