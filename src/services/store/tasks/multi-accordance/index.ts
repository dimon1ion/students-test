import StoreModule from "../../module";
import { ITaskState } from "../../types";
import {
  IMultiAccordanceInitState,
  IMultiAccordanceResponseFinish,
  IMultiAccordanceResponseLoad,
} from "./types";

class MultiAccordanceState
  extends StoreModule<IMultiAccordanceInitState>
  implements ITaskState
{
  initState(): IMultiAccordanceInitState {
    return {
      taskId: null,
      description: "",
      image: null,
      portables: [],
      accordances: [],
      columns: [],
      columns_name: "",
      result: [],
      mark: null,
      waiting: false,
      waitingLoad: false,
    };
  }

  async load(taskId: number, onError: (taskType?: string) => void) {
    this.setState(
      {
        ...this.initState(),
        waitingLoad: true,
      },
      "Ожидание загрузки Множ Соответствий"
    );

    const res = await this.services.api.request<IMultiAccordanceResponseLoad>({
      url: `/api/v1/student/task/multiple_accordance/${taskId}`,
    });
    console.log(res);

    if (!res.ok) {
      this.setState(
        {
          ...this.initState(),
          waitingLoad: false,
        },
        "Множ Соответствия не загружены"
      );
      onError();
      return;
    }
    let isOrdered = false;
    const accordances = res.data.data.accordances.map((value) => {
      if (value.value_type == "image") {
        value.value = this.services.api.config.imageBaseUrl + value.value;
      } else if (value.value_type === "order") {
        isOrdered = true;
      }
      return value;
    });
    const portables = res.data.data.portables.map((value) => {
      if (value.value_type == "image") {
        value.value = this.services.api.config.imageBaseUrl + value.value;
      }
      return value;
    });
    if (isOrdered) {
      accordances.sort((a, b) => {
        return +a.value - +b.value;
      });
    }
    this.setState({
      ...this.getState(),
      taskId: res.data.data.task_id,
      description: res.data.data.description,
      columns_name: res.data.data.columns_name,
      columns: res.data.data.columns,
      portables,
      accordances,
      waitingLoad: false,
    });
  }

  setResult(
    answerId: number,
    parentId: number | null,
    columnId: number | null
  ) {
    // SC - same column, одинаковый ряд
    let foundSCParentIndex = -1;
    let foundAnswerIndex = -1; // Ответ может быть в другом ряде, но мы знаем 100%, что он будет только в 1 количестве в answers
    const results = this.getState().result.map((result, index) => {
      if (result.accordanceId === parentId && result.columnId == columnId) {
        foundSCParentIndex = index;
      }
      if (result.portableId === answerId) {
        foundAnswerIndex = index;
      }
      return result;
    });
    if (
      foundAnswerIndex != -1 &&
      foundSCParentIndex != -1 &&
      foundAnswerIndex == foundSCParentIndex
    ) {
      return;
    }
    if (parentId === null || columnId == null) {
      if (foundAnswerIndex != -1) {
        results.splice(foundAnswerIndex, 1);
      }
    } else if (foundSCParentIndex != -1) {
      if (foundAnswerIndex != -1) {
        // Узнаю Родителя и Ряд моего ответа, который уже есть где то
        let { accordanceId: answerParent, columnId: answerColumn } =
          results[foundAnswerIndex];
        // Узнаю ид ответа, который стоит на моем месте, куда я хочу переместить
        let anotherAnswer = results[foundSCParentIndex].portableId;
        // Записываю другой ответ, на своё старое место, теперь в 2х местах один и тот же другой ответ
        results[foundAnswerIndex] = {
          portableId: anotherAnswer,
          accordanceId: answerParent,
          columnId: answerColumn,
        };
      }
      results[foundSCParentIndex] = {
        accordanceId: parentId,
        portableId: answerId,
        columnId: columnId,
      };
    } else {
      if (foundAnswerIndex != -1) {
        results.splice(foundAnswerIndex, 1);
      }
      results.push({ accordanceId: parentId, portableId: answerId, columnId });
    }
    this.setState({
      ...this.getState(),
      result: results,
    });
  }

  async finishAccordance(onSuccess: () => void) {
    if (this.getState().result.length !== this.getState().accordances.length * this.getState().columns.length) {
      return;
    }
    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      "Ожидание финиша Множ Соответствия"
    );
    const data = {
      data: {
        task_id: this.getState().taskId,
        comparisons: this.getState().result.map((item) => ({
          portable_id: item.portableId,
          accordance_id: item.accordanceId,
          column_id: item.columnId
        })),
      },
    };
    const res = await this.services.api.request<IMultiAccordanceResponseFinish>({
      url: `/api/v1/student/task/multiple_accordance/finish`,
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log(res);
    if (res.data.status == "success") {
      this.setState(
        {
          ...this.getState(),
          mark: res.data.data.score,
        },
        "Множ Соответствие завершено"
      );
      onSuccess();
    } else {
    }
    this.setState(
      {
        ...this.getState(),
        waiting: false,
      },
      "Прекращение ожидания"
    );
  }
}

export default MultiAccordanceState;
