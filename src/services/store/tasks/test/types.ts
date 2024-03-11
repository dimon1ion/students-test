import { IServerResponse } from "../../types";

export interface ITaskInitState {
  id: number | null;
  questions: IQuestion[];
  answers: IAsnwer[];
  waiting: boolean;
}

interface IAsnwer {
  question_id: number;
  answer_id: number;
}

export type ITaskResponseLoad = IServerResponse<{
  id: number;
  questions: IQuestion[];
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
