import { IConfig } from "./types";

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Настройки сервисов
 */
const config : IConfig = {
  store: {
    // Логировать установку состояния?
    log: !isProduction,
    // Настройки модулей состояния
    modules: {
      session: {
        // Названия токена в АПИ
        tokenHeader: 'Authorization'
      }
    }
  },
  api: {
    baseUrl: 'http://senspulv.beget.tech',
    defaultHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  },
}

export default config;
