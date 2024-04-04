import { IServerResponse } from "../types";

export interface IResultsInitState {
  data: IResult[];
  waiting: boolean;
}

export type IResultsResponseLoad = IServerResponse<IResult[]>;

export interface IResult {
  id: number;
  score: number;
  module_id: number;
  student_profile_id: number;
  module: {
    id: number;
    name: string;
    tasks_number: number;
    description: null | string;
  };
  tasks: ITask[] | undefined
}

export interface ITask {
    id: number,
    name: string,
    score: number,
}
