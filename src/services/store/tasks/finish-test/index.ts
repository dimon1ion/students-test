import StoreModule from "../../module";
import { ITaskState } from "../../types";
import { IFinishTestInitState, IFinishTestResponseFinish, IFinishTestResponseLoad } from "./types";

class FinishTest extends StoreModule<IFinishTestInitState> implements ITaskState {
  initState(): IFinishTestInitState {
    return {
      taskId: null,
      questions: [],
      answers: [],
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
      "Ожидание загрузки Теста"
    );

    const res = await this.services.api.request<IFinishTestResponseLoad>({
      url: `/api/v1/student/task/finish_test/${taskId}`,
    });
    console.log(res);

    if (!res.ok) {
      this.setState(
        {
          ...this.initState(),
          waitingLoad: false,
        },
        "Тест не загружен"
      );
      onError();
      return;
    }
    this.setState({
      ...this.getState(),
      taskId: res.data.data.task_id,
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
        task_id: this.getState().taskId,
        answers: this.getState().answers.map(answer => ({answer_id: answer.answer_id})),
      }
    }
    const res = await this.services.api.request<IFinishTestResponseFinish>({
      url: `/api/v1/student/task/finish_test/finish`,
      method: "POST",
      body: JSON.stringify(data)
    });
    console.log(res);
    if (res.ok) {
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

export default FinishTest;
