import { IConfig } from "src/types";
import APIService from "./api";
import Store from "./store";

/**
 * Класс для использования Services
 * @constructor config {Object}
 */
class Services {
  config: IConfig;
  _api: APIService | undefined;
  _store: Store | undefined;

  constructor(config: IConfig) {
    this.config = config;
  }

  /**
   * Сервис АПИ
   * @returns {APIService}
   */
  get api(): APIService {
    if (!this._api) {
      this._api = new APIService(this, this.config.api);
    }
    return this._api;
  }

  /**
   * Сервис Store
   * @returns {Store}
   */
  get store(): Store {
    if (!this._store) {
      this._store = new Store(this, this.config.store);
    }
    return this._store;
  }
}

export default Services;
