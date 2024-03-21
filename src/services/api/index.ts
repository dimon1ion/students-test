import Services from "..";
import { APIConfig, ApiRequest, ApiResponse } from "./types";

class APIService {
  services: Services;
  config: APIConfig;
  defaultHeaders: Record<string, string>;

  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services: Services, config: APIConfig = {} as APIConfig) {
    this.services = services;
    this.config = config
    this.defaultHeaders = config.defaultHeaders;
  }
  /**
   * HTTP запрос
   * @param url
   * @param method
   * @param headers
   * @param options
   * @returns {Promise<{}>}
   */
  async request<T>({url, method = 'GET', headers = {}, ...options}: ApiRequest): Promise<ApiResponse<T>> {
    if (!url.match(/^(http|\/\/)/)) url = this.config.baseUrl + url;
    const res = await fetch(url, {
      method,
      headers: {...this.defaultHeaders, ...headers},
      ...options,
    });
    if (res.status === 401) {
      this.services.store.actions.session.remind();
    }
    return {data: await res.json(), status: res.status, headers: res.headers};
  }

  /**
   * Установка или сброс заголовка
   * @param name {String} Название заголовка
   * @param value {String|null} Значение заголовка
   */
  setHeader(name?: string, value: string | null = null) {
    if (!name) return;
    if (value) {
      this.defaultHeaders[name] = value;
    } else if (this.defaultHeaders[name]) {
      delete this.defaultHeaders[name];
    }
  }
}

export default APIService;
