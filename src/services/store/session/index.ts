import StoreModule from "../module";
import { ISessionConfig, ISessionInitState, ISessionResponseRemind, ISessionResponseSignIn, ISessionSignInData } from "./types";

/**
 * Сессия
 */
class SessionState extends StoreModule<ISessionInitState, ISessionConfig> {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState(): ISessionInitState {
    return {
      user: {},
      token: null,
      errorMessage: "",
      waiting: true, // true должен быть
      exists: false
    };
  }

  initConfig(): ISessionConfig {
    return {
      tokenHeader: "Authorization"
    }
  }

  /**
   * Авторизация (вход)
   * @param data
   * @param onSuccess
   * @returns {Promise<void>}
   */
  async signIn(data: ISessionSignInData, onSuccess: () => void) {
    this.setState(this.initState(), 'Авторизация');
    try {
      const res = await this.services.api.request<ISessionResponseSignIn>({
        url: '/api/v1/auth/login',
        method: 'POST',
        body: JSON.stringify(data)
      });
      console.log(res);

      if (res.data.status.localeCompare("succes")) {
        this.setState({
          ...this.getState(),
          token: res.data.data.access_token,
          user: res.data.data.user,
          exists: true,
          waiting: false
        }, 'Успешная авторизация');

        // Запоминаем токен, чтобы потом автоматически аутентифицировать юзера
        window.localStorage.setItem('token', res.data.data.access_token);

        // Устанавливаем токен в АПИ
        this.services.api.setHeader(this.config.tokenHeader, "Bearer " + res.data.data.access_token);

        if (onSuccess) onSuccess();
      } else {
        this.setState({
          ...this.getState(),
          errorMessage: res.data.message,
          waiting: false
        }, 'Ошибка авторизации');
      }

    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Отмена авторизации (выход)
   * @returns {Promise<void>}
   */
  async signOut() {
    try {
      await this.services.api.request({
        url: '/api/v1/auth/logout',
        method: 'DELETE'
      });
      // Удаляем токен
      window.localStorage.removeItem('token');
      // Удаляем заголовок
      this.services.api.setHeader(this.config.tokenHeader, null);
    } catch (error) {
      console.error(error);
    }
    this.setState({...this.initState(), waiting: false});
  }

  /**
   * По токену восстановление сессии
   * @return {Promise<void>}
   */
  async remind() {
    // TODO - раскомментировать
    const token = localStorage.getItem('token');
    if (token) {
      // Устанавливаем токен в АПИ
      this.services.api.setHeader(this.config.tokenHeader, "Bearer " + token);
      // Проверяем токен выбором своего профиля
      const res = await this.services.api.request<ISessionResponseRemind>({url: '/api/v1/auth/current/user'});
      console.log(res);

      if (res.data.status === "fail") {
        // Удаляем плохой токен
        window.localStorage.removeItem('token');
        this.services.api.setHeader(this.config.tokenHeader, null);
        this.setState({
          ...this.getState(), exists: false, waiting: false
        }, 'Сессии нет');
      } else {
        this.setState({
          ...this.getState(), token: token, user: res.data.data.user, exists: true, waiting: false
        }, 'Успешно вспомнили сессию');
      }
    } else {
      // Если токена не было, то сбрасываем ожидание (так как по умолчанию true)
      this.setState({
        ...this.getState(), exists: false, waiting: false
      }, 'Сессии нет');
    }
  }

  /**
   * Сброс ошибок авторизации
   */
  // resetErrors() {
  //   this.setState({...this.initState(), errors: null, waiting: false}, "Сброс");
  // }
}

export default SessionState;
