import StoreModule from "../module";
import { IMainInitState, IMainResponseLoad, IMainStartModuleResponseLoad, IModule } from "./types";

class MainState extends StoreModule<IMainInitState> {
  initState(): IMainInitState {
    return {
      modules: [],
      waiting: false, // признак ожидания загрузки
    };
  }

  async load(clear: boolean = true) {
    const state = clear ? this.initState() : this.getState();
    this.setState(
      {
        ...state,
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
        await this.startModule(moduleId)
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
    await this.load(false);
  }

  checkFinalTask(moduleIndex: number, taskId: number, func: (isFinal: boolean) => void) {
    let isFinal = false;
    const tasks = this.getState().modules[moduleIndex].tasks;
    if (tasks[tasks.length - 1].id == taskId) {
      isFinal = true;
    }
    func(isFinal);
  }
}

export default MainState;
