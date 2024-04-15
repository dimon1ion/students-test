import { IServerResponse } from "../../types";

export interface IMultiAccordanceInitState {
  taskId: number | null;
  image: string | null;
  description: string;
  accordances: IAccordance[];
  portables: IPortable[];
  columns: IColumn[];
  result: IResult[];
  mark: number | null;
  waiting: boolean;
  waitingLoad: boolean;
}

export type IMultiAccordanceResponseLoad = IServerResponse<{
  task_id: number;
  description: string;
  accordances: IAccordance[];
  portables: IPortable[];
  columns: IColumn[];
}>;

export type IMultiAccordanceResponseFinish = IServerResponse<{
  task_id: number;
  score: number;
  id: number;
  student_profile_id: number;
}>;

interface IAccordance {
  id: number;
  value: string;
  value_type: "string" | "image" | "order";
}

export interface IPortable {
  id: number;
  value: string;
  value_type: "string" | "image" | "order";
}

export interface IColumn {
  id: number;
  name: string;
}

export interface IResult {
  accordanceId: number;
  portableId: number;
  columnId: number;
}
