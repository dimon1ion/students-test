export type ApiRequest = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
} & RequestInit;

export interface ApiResponse<T> {
  data: T;
  status: number;
  headers: any;
  ok: boolean;
}

export type APIConfig = {
  baseUrl: string;
  defaultHeaders: Record<string, any>;
};
