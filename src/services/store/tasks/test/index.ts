import StoreModule from "../../module";
import { ITaskInitState, ITaskResponseFinish, ITaskResponseLoad } from "./types";

class TaskState extends StoreModule<ITaskInitState> {
  initState(): ITaskInitState {
    return {
      id: null,
      questions: [],
      answers: [],
      mark: null,
      waiting: false,
      waitingLoad: false,
    };
  }

  async load(test_id: number) {
    this.setState(
      {
        ...this.initState(),
        waitingLoad: true,
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
          waitingLoad: false,
        },
        "Тест не загружен"
      );
    }
    this.setState({
      ...this.getState(),
      id: res.data.data.id,
      questions: res.data.data.questions,
      waitingLoad: false,
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

  async finishTest(onSuccess: () => void) {
    if (this.getState().questions.length !== this.getState().answers.length) {
      return;
    }
    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      "Ожидание финиша Теста"
    );
    const data = {
      data: {
        test_id: this.getState().id,
        answers: this.getState().answers.map(answer => ({answer_id: answer.answer_id})),
      } 
    }
    const res = await this.services.api.request<ITaskResponseFinish>({
      url: `/api/v1/student/test/finish`,
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
        "Тест завершен"
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

export default TaskState;
