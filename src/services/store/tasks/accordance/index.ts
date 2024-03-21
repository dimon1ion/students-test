import StoreModule from "../../module";
import { IAccordanceInitState, IAccordanceResponseLoad } from "./types";

class AccordanceState extends StoreModule<IAccordanceInitState> {
  initState(): IAccordanceInitState {
    return {
      title: "",
      image: null,
      answers: [],
      parents: [],
      result: [],
      waiting: false,
    };
  }

  async load(moduleId: number, taskId: number) {
    this.setState(
      {
        ...this.initState(),
        waiting: true,
      },
      "Ожидание загрузки Соответствий"
    );

    const res = await this.services.api.request<IAccordanceResponseLoad>({
      url: `/api/v1/student/task/${moduleId}/${taskId}`,
    });
    console.log(res);

    if (res.status !== 200) {
      this.setState(
        {
          ...this.initState(),
          waiting: false,
        },
        "Соответствия не загружены"
      );
    }
    this.setState({
      ...this.getState(),
      title: res.data.data.task_description,
      answers: res.data.data.answers,
      parents: res.data.data.images.map(value => {
        value.url = this.services.api.config.baseUrl + value.url;
        return value;
      }),
      waiting: false,
    });
  }

  setResult(answerId: number, parentId: number | null) {
    let foundParentIndex = -1;
    let foundAnswerIndex = -1;
    const results = this.getState().result.map((result, index) => {
      if (result.parentId === parentId) {
        foundParentIndex = index;
      }
      if (result.answerId === answerId) {
        foundAnswerIndex = index;
      }
      return result;
    });
    if (
      foundAnswerIndex != 1 &&
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
        let answerParent = results[foundAnswerIndex].parentId;
        let anotherAnswer = results[foundParentIndex].answerId;
        results[foundAnswerIndex] = {
          answerId: anotherAnswer,
          parentId: answerParent,
        };
      }
      results[foundParentIndex] = { parentId, answerId };
    } else {
      if (foundAnswerIndex != -1) {
        results.splice(foundAnswerIndex, 1);
      }
      results.push({ parentId, answerId });
    }
    this.setState({
      ...this.getState(),
      result: results,
    });
  }

  async finishAccordance(onSuccess: () => void) {}
}

export default AccordanceState;
