import { IServerResponse } from "../types";

export interface ISessionInitState {
  user: Partial<ISessionUser>;
  token: string | null;
  errorMessage: string;
  waiting: boolean;
  exists: boolean;
}

export interface ISessionSignInData {
  email: string;
  password: string;
}

export type ISessionResponseSignIn = IServerResponse<{
    access_token: string;
    user: ISessionUser;
}>;

export type ISessionResponseRemind = IServerResponse<{
  user: ISessionUser;
}>;

export interface ISessionUser {
  id: number,
  name: string,
  surname: string,
  email: string,
  role_id: number,
  created_at: string,
  updated_at: string,
  role: {
      id: number,
      name: string, // admin
  }
}

export interface ISessionConfig {
  tokenHeader: string;
}
