import { IServerResponse } from "../../types";

export interface IInputTestInitState {
  taskId: number | null;
  description: string;
  task_image: string | null;
  questions: IQuestion[];
  answers: IAnswer[];
  mark: number | null;
  waiting: boolean;
  waitingLoad: boolean;
}

export interface IQuestion {
  id: number;
  test_id: number;
  image: string;
  prompt: string;
}

export interface IAnswer {
  question_id: number;
  student_answer: string;
}

export type IInputTestResponseLoad = IServerResponse<{
  task_id: number;
  task_image: string;
  description: string;
  questions: IQuestion[];
}>;

export type ITaskResponseFinish = IServerResponse<{
  student_test_id: number;
  score: number;
  id: number;
}>;
