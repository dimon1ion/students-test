import StoreModule from "../module";
import { IMainInitState } from "./types";


class MainState extends StoreModule<IMainInitState> {

  initState(): IMainInitState {
    return {
      list: [],
      waiting: false // признак ожидания загрузки
    }
  }

  async load(){

  }

}

export default MainState;
