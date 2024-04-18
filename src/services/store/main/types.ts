import { ModuleStatus, TaskStatus, TaskType } from "@src/types";
import { IServerResponse } from "../types";

export interface IMainInitState {
  modules: IModule[];
  waiting: boolean;
}

export type IMainResponseLoad = IServerResponse<IModule[]>;
export type IMainStartModuleResponseLoad = IServerResponse<{}>;

export interface IModuleTask {
  id: number;
  module_id: number;
  number: number;
  type: TaskType;
  isAdditional: boolean;
  description: string;
  image: null;
  status: TaskStatus;
}

export interface IModule {
  id: number;
  name: string;
  task_number: number;
  description: string | null;
  status: ModuleStatus;
  tasks: IModuleTask[];
}
