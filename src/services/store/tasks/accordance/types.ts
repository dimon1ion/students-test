import { IServerResponse } from "../../types";

export interface IAccordanceInitState {
  image: string | null,
  title: string,
  parents: IParent[],
  answers: IAnswer[],
  result: IResult[],
  waiting: boolean,
}

export type IAccordanceResponseLoad = IServerResponse<{
    task_description: string;
    images: IParent[];
    answers: IAnswer[];
  }>;

interface IParent {
    id: number,
    url: string,
}

interface IAnswer {
    id: number,
    text: string,
}

interface IResult {
    parentId: number,
    answerId: number,
}