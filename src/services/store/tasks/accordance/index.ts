import StoreModule from "../../module";
import { ITaskState } from "../../types";
import { IAccordanceInitState, IAccordanceResponseFinish, IAccordanceResponseLoad } from "./types";

class AccordanceState extends StoreModule<IAccordanceInitState> implements ITaskState {
  initState(): IAccordanceInitState {
    return {
      description: "",
      image: null,
      portables: [],
      accordances: [],
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
      "Ожидание загрузки Соответствий"
    );

    const res = await this.services.api.request<IAccordanceResponseLoad>({
      url: `/api/v1/student/task/accordance/${taskId}`,
    });

    if (!res.ok) {
      this.setState(
        {
          ...this.initState(),
          waitingLoad: false,
        },
        "Соответствия не загружены"
      );
      onError();
      return;
    }
    let isOrdered = false;
    const accordances = res.data.data.accordances.map(value => {
      if (value.value_type == "image") {
        value.value = this.services.api.config.imageBaseUrl + value.value;
      } else if (value.value_type === "order") {
        isOrdered = true;
      }
      return value;
    });
    const portables = res.data.data.portables.map(value => {
      if (value.value_type == "image") {
        value.value = this.services.api.config.imageBaseUrl + value.value;
      }
      return value;
    });
    if (isOrdered) {
      accordances.sort((a, b) => {
        return +a.value - +b.value
      });
    }
    this.setState({
      ...this.getState(),
      description: res.data.data.description,
      image: res.data.data.task_image,
      portables,
      accordances,
      waitingLoad: false,
    });
  }

  setResult(answerId: number, parentId: number | null) {
    let foundParentIndex = -1;
    let foundAnswerIndex = -1;
    const results = this.getState().result.map((result, index) => {
      if (result.accordanceId === parentId) {
        foundParentIndex = index;
      }
      if (result.portableId === answerId) {
        foundAnswerIndex = index;
      }
      return result;
    });
    if (
      foundAnswerIndex != -1 &&
      foundParentIndex != -1 &&
      foundAnswerIndex == foundParentIndex
    ) {
      return;
    }
    if (parentId === null) {
        if (foundAnswerIndex != -1) {
            results.splice(foundAnswerIndex, 1);
        }
    } else if (foundParentIndex != -1) {
      if (foundAnswerIndex != -1) {
        let answerParent = results[foundAnswerIndex].accordanceId;
        let anotherAnswer = results[foundParentIndex].portableId;
        results[foundAnswerIndex] = {
          portableId: anotherAnswer,
          accordanceId: answerParent,
        };
      }
      results[foundParentIndex] = { accordanceId: parentId, portableId: answerId };
    } else {
      if (foundAnswerIndex != -1) {
        results.splice(foundAnswerIndex, 1);
      }
      results.push({ accordanceId: parentId, portableId: answerId });
    }
    this.setState({
      ...this.getState(),
      result: results,
    });
  }

  async finishAccordance(onSuccess: () => void, taskId: number) {
    if (this.getState().result.length !== this.getState().accordances.length) {
      return;
    }
    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      "Ожидание финиша Соответствия"
    );
    const data = {
        data: {
          task_id: taskId,
          comparisons: this.getState().result.map(item => ({
            portable_id: item.portableId,
            accordance_id: item.accordanceId
          }))
        }
    }
    const res = await this.services.api.request<IAccordanceResponseFinish>({
      url: `/api/v1/student/task/accordance/finish`,
      method: "POST",
      body: JSON.stringify(data)
    });
    console.log(res);
    if (res.data.status == "success") {
      this.setState(
        {
          ...this.getState(),
          mark: res.data.data.score,
        },
        "Соответствие завершено"
      );
      onSuccess();
    }
    else {
      
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

export default AccordanceState;
