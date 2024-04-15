import { memo } from "react";
import "./style.css";
import AccDroppableItem from "@src/components/accordance-components/acc-droppable-item";
import AccParentItem from "@src/components/accordance-components/acc-parent-item";
import { IColumn } from "@src/services/store/tasks/multi-accordance/types";

interface IMultiAccAnswersItemProps {
  parentId: number;
  columns: IColumn[];
  elements: {
    element: React.ReactNode;
    columnId: number;
  }[];
  value: string;
  value_type: "order" | "string" | "image";
}

function MultiAccAnswersItem(props: IMultiAccAnswersItemProps) {
  return (
    <div className="MultiAccAnswersItem">
      {props.columns.map((column) => (
        <AccDroppableItem
          size="small"
          columnId={column.id}
          parentId={props.parentId}
          id={crypto.randomUUID()}
          element={
            props.elements.find((element) => element.columnId == column.id)
              ?.element
          }
        />
      ))}
      <AccParentItem
        size="small"
        value={props.value}
        value_type={props.value_type}
      />
    </div>
  );
}

export default memo(MultiAccAnswersItem);
