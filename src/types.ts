import { APIConfig } from "./services/api/types";
// import { ChatConfig } from "./chat/types";
import { StoreConfigs } from "./services/store/types";

export type ConfigStoreModules = {

} & StoreConfigs;

export interface StoreConfig {
  log: boolean;
  modules: Partial<ConfigStoreModules>;
}

export interface IConfig {
  store: StoreConfig;
  api: APIConfig;
}

export type StoreConfigModulesKeys = keyof ConfigStoreModules;
export type ModuleStatus = "не начат" | "начат";
export type TaskType = "finalTest" | "accordance" | "test";
export type TaskStatus = "не активено" | "активно" | "закончено"; 

