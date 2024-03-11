import StoreModule from "../../module";
import { ITaskInitState, ITaskResponseLoad } from "./types";

class TaskState extends StoreModule<ITaskInitState> {
  initState(): ITaskInitState {
    return {
      id: null,
      questions: [],
      answers: [],
      waiting: false,
    };
  }

  async load(test_id: number) {
    this.setState(
      {
        ...this.initState(),
        waiting: true,
      },
      "Ожидание загрузки Теста"
    );

    const res = await this.services.api.request<ITaskResponseLoad>({
      url: `/api/v1/student/test/${test_id}`,
    });
    console.log(res);

    if (res.status !== 200) {
      this.setState(
        {
          ...this.initState(),
          waiting: false,
        },
        "Тест не загружен"
      );
    }
    this.setState({
      ...this.getState(),
      id: res.data.data.id,
      questions: res.data.data.questions,
      waiting: false,
    });
  }

  setAnswer(question_id: number, answer_id: number) {
    let foundIndex = -1;
    const answers = this.getState().answers.map((answer, index) => {
      if (answer.question_id === question_id) {
        foundIndex = index;
      }
      return answer;
    });
    if (foundIndex != -1) {
      answers[foundIndex] = { question_id, answer_id };
    } else {
      answers.push({ question_id, answer_id });
    }
    this.setState({
      ...this.getState(),
      answers,
    });
  }
}

export default TaskState;
