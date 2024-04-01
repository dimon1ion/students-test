import StoreModule from "../module";
import { IMainInitState, IMainResponseLoad, IMainStartModuleResponseLoad, IModule } from "./types";

class MainState extends StoreModule<IMainInitState> {
  initState(): IMainInitState {
    return {
      modules: [],
      waiting: false, // признак ожидания загрузки
    };
  }

  async load() {
    this.setState(
      {
        ...this.initState(),
        waiting: true,
      },
      "Ожидание загрузки Модулей"
    );

    const res = await this.services.api.request<IMainResponseLoad>({
      url: `/api/v1/student/module`,
    });
    console.log(res);

    if (res.status !== 200) {
      this.setState(
        {
          ...this.initState(),
          waiting: false,
        },
        "Модули не загружены"
      );
      return;
    }
    this.setState({
      ...this.getState(),
      modules: res.data.data,
      waiting: false,
    });
  }

  async changeModuleStatus(moduleId: IModule["id"]) {
    const module = this.getState().modules.find(module => module.id == moduleId);
    if (!module) {
      console.log("А нет такого модуля");
      return;
    }
    switch (module.status) {
      case "начат":
        break;
      case "не начат":
        this.startModule(moduleId)
        break;
      default:
        break;
    }
  }

  async startModule(moduleId: IModule["id"]) {
    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      "Ожидание старта Модуля"
    );

    const res = await this.services.api.request<IMainStartModuleResponseLoad>({
      url: `/api/v1/student/module/start/${moduleId}`,
      method: "PATCH",
    });
    console.log(res);
    
    if (res.status !== 200) {
      this.setState(
        {
          ...this.initState(),
          waiting: false,
        },
        "Модуль не начат"
      );
      return;
    }
    this.load();
  }
}

export default MainState;
