import StoreModule from "../../module";
import { ITaskState } from "../../types";
import {
  IInputTestInitState,
  IInputTestResponseLoad,
  ITaskResponseFinish,
} from "./types";

class InputTestState
  extends StoreModule<IInputTestInitState>
  implements ITaskState
{
  initState(): IInputTestInitState {
    return {
      taskId: null,
      task_image: null,
      description: "",
      questions: [],
      answers: [],
      mark: null,
      waiting: false,
      waitingLoad: false,
    };
  }

  async load(task_id: number, onError: (taskType?: string) => void) {
    this.setState(
      {
        ...this.initState(),
        taskId: task_id,
        waitingLoad: true,
      },
      "Ожидание загрузки Input Test"
    );

    const res = await this.services.api.request<IInputTestResponseLoad>({
      url: `/api/v1/student/task/input_test/${task_id}`,
    });
    console.log(res);

    if (!res.ok) {
      this.setState(
        {
          ...this.initState(),
          waitingLoad: false,
        },
        "Input Test не загружен"
      );
      onError();
      return;
    } else if (res.data.data.questions.length === 0) {
      this.setState(
        {
          ...this.initState(),
          waitingLoad: false,
        },
        "Нет вопросов"
      );
      return;
    }
    this.setState({
      ...this.getState(),
      taskId: res.data.data.task_id,
      task_image: res.data.data.task_image,
      description: res.data.data.description,
      questions: res.data.data.questions,
      waitingLoad: false,
    });
  }

  setAnswer(questionId: number, student_answer: string) {
    student_answer = student_answer.trim();
    let foundAnswerIndex = -1;

    const answers = this.getState().answers.map((answer, index) => {
      if (answer.question_id === questionId) {
        foundAnswerIndex = index;
      }
      return answer;
    });
    if (foundAnswerIndex !== -1) {
        if (student_answer === "") {
            answers.splice(foundAnswerIndex, 1);
        } else {
            answers[foundAnswerIndex].student_answer = student_answer;
        }
    } else {
        answers.push({question_id: questionId, student_answer});
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
      "Ожидание финиша Input Test"
    );
    const data = {
      data: {
        task_id: this.getState().taskId,
        answers: this.getState().answers
      }
    };
    const res = await this.services.api.request<ITaskResponseFinish>({
      url: `/api/v1/student/task/input_test/finish`,
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log(res);
    if (res.data.status == "success") {
      this.setState(
        {
          ...this.getState(),
          mark: res.data.data.score,
          waiting: false,
        },
        "Input Test завершен"
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

export default InputTestState;
