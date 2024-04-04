import StoreModule from "../module";
import { IResultsInitState, IResult, IResultsResponseLoad } from "./types";

class ResultsState extends StoreModule<IResultsInitState> {
  initState(): IResultsInitState {
    return {
      data: [],
      waiting: false, // признак ожидания загрузки
    };
  }

  async load() {
    this.setState(
      {
        ...this.initState(),
        waiting: true,
      },
      "Ожидание загрузки Результатов"
    );

    const res = await this.services.api.request<IResultsResponseLoad>({
      url: `/api/v1/student/module/results`,
    });
    console.log(res);

    if (!res.ok) {
      this.setState(
        {
          ...this.initState(),
          waiting: false,
        },
        "Результаты не загружены"
      );
      return;
    }
    const data = Array(6).fill([...res.data.data]).reduce((a, b) => a.concat(b));
    this.setState({
      ...this.getState(),
    //   data: res.data.data,
      data,
      waiting: false,
    });
  }
}

export default ResultsState;
