import { IServerResponse } from "../../types";

export interface IAccordanceInitState {
  image: string | null;
  description: string;
  accordances: IAccordance[];
  portables: IPortable[];
  result: IResult[];
  mark: number | null;
  waiting: boolean;
  waitingLoad: boolean;
}

export type IAccordanceResponseLoad = IServerResponse<{
  description: string;
  accordances: IAccordance[];
  portables: IPortable[];
}>;

export type IAccordanceResponseFinish = IServerResponse<{
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

interface IPortable {
  id: number;
  value: string;
  value_type: "string" | "image" | "order";
}

interface IResult {
  accordanceId: number;
  portableId: number;
}
