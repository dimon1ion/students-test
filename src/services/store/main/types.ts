import { ModuleStatus, TaskStatus, TaskType } from "@src/types";

export interface IMainInitState {
  list: IModuleData[];
  waiting: boolean;
}

export interface IModuleData {
  id: string | number; //id Модуля, я пока не знаю какого типа у тебя будут ID
  title: string; //название Модуля
  data: IModuleTask[]; //все задания этого модуля
  status?: ModuleStatus; //статус модуля
}

export interface IModuleTask {
  taskId: string | number; //id Задания
  title: string; //Название задания
  taskType: TaskType; //Тип задания для адресации на шаблон
  status: TaskStatus; // Статус задания
}
