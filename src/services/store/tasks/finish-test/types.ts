import { IServerResponse } from "../../types";

export interface IFinishTestInitState {
  taskId: number | null;
  questions: IQuestion[];
  answers: IAnswer[];
  mark: number | null;
  waiting: boolean;
  waitingLoad: boolean;
}

interface IAnswer {
  question_id: number;
  answer_id: number;
}

export type IFinishTestResponseLoad = IServerResponse<{
  id: number;
  task_id: number;
  questions: IQuestion[];
}>;

export type IFinishTestResponseFinish = IServerResponse<{
  student_test_id: number;
  score: number;
  id: number;
}>;

export interface IQuestion {
  id: number;
  question_text: string;
  test_id: number;
  answers: IQuestionAnswer[];
}

export interface IQuestionAnswer {
  id: number;
  answer_text: string;
  question_id: number;
}
