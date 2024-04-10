import { IServerResponse } from "../../types";

export interface IMultipleTestInitState {
  taskId: number | null;
  title: string;
  questions: IQuestion[];
  answers: IAnswer[];
  activeQuestion: {
    question: IQuestion;
    index: number;
  } | null;
  mark: number | null;
  waiting: boolean;
  waitingLoad: boolean;
}

export type IMultipleTestResponseLoad = IServerResponse<{
  id: number;
  description: string;
  questions: IQuestion[];
}>;

export type ITaskResponseFinish = IServerResponse<{
  student_test_id: number;
  score: number;
  id: number;
}>;

export interface IQuestion {
  id: number;
  text: string;
  image: string | undefined;
  answerType: "image" | "string";
  test_id: number;
  answers: IQuestionAnswer[];
  multiple: boolean;
}

export interface IQuestionAnswer {
  id: number;
  text: string;
  question_id: number;
}

export interface IAnswer {
  question_id: number;
  answersIds: number[];
}
