import { IServerResponse } from "../../types";

export interface ITaskInitState {
  id: number | null;
  questions: IQuestion[];
  answers: IAnswer[];
  mark: number | null;
  waiting: boolean;
}

interface IAnswer {
  question_id: number;
  answer_id: number;
}

export type ITaskResponseLoad = IServerResponse<{
  id: number;
  questions: IQuestion[];
}>;

export type ITaskResponseFinish = IServerResponse<{
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
