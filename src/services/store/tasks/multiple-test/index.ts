import StoreModule from "../../module";
import { IMultipleTestInitState, IMultipleTestResponseLoad, IQuestion, IQuestionAnswer, ITaskResponseFinish } from "./types";

class MultipleTestState extends StoreModule<IMultipleTestInitState> {
  initState(): IMultipleTestInitState {
    return {
      taskId: null,
      questions: [],
      answers: [],
      activeQuestion: null,
      mark: null,
      waiting: false,
      waitingLoad: false,
    };
  }

  async load(test_id: number) {
    this.setState(
      {
        ...this.initState(),
        taskId: test_id,
        waitingLoad: true,
      },
      "Ожидание загрузки Теста"
    );

    const res = await this.services.api.request<IMultipleTestResponseLoad>({
      url: `/api/v1/student/task/test/${test_id}`,
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
      return;
    } else if(res.data.data.questions.length === 0) {
      this.setState(
        {
          ...this.initState(),
          waitingLoad: false,
        },
        "Нет вопросов"
      );
      return;
    }
    const questions = res.data.data.questions.map(question => {
      question.multiple = Boolean(question.multiple);
      if (question.image) {
        question.image = this.services.api.config.baseUrl + question.image;
      }
      return question;
    });
    this.setState({
      ...this.getState(),
      questions: questions,
      activeQuestion: {
        question: questions[0],
        index: 0
      },
      waitingLoad: false,
    });
  }

  changeQuestion(next: boolean) {
    console.log("Работает вроде", next);
    const activeQuestion = this.getState().activeQuestion;
    if (!activeQuestion) {
      console.log("Нет активного вопроса, странно")
      if (this.getState().questions.length > 0) {
        this.setState({
          ...this.getState(),
          activeQuestion: {
            question: this.getState().questions[0],
            index: 0
          }
        })
      }
      return;
    }
    const questions = this.getState().questions;
    const index = questions.findIndex(question => question.id === activeQuestion.question.id);
    if (next && index + 1 < questions.length) {
      this.setState({
        ...this.getState(),
        activeQuestion: {
          question: questions[index + 1],
          index: index + 1,
        }
      })
    } else if (index - 1 >= 0) {
      this.setState({
        ...this.getState(),
        activeQuestion: {
          question: questions[index - 1],
          index: index - 1,
        }
      })
    }
  }

  setAnswer(question: IQuestion, answer_id: IQuestionAnswer["id"]) {
    // Поиск вопроса в ответах. И поиск ответа по вопросу имеющихся ответов
    let foundAnswerIndex = -1;
    let foundQuestionAnswerIndex = -1;
    const answers = this.getState().answers.map((answer, index) => {
      if (answer.question_id === question.id) {
        foundAnswerIndex = index;
        foundQuestionAnswerIndex = answer.answersIds.indexOf(answer_id);
      }
      return answer;
    });
    // Если нет ответа на вопрос, добавляем ответ на вопрос multiple проверять не нужно
    if (foundAnswerIndex === -1) {
      answers.push({ question_id: question.id, answersIds: [answer_id] });
    } else {
      // Проверка на имеющийся ответ по родителю и удаление его частично или полностью при пустом массиве
      if (foundQuestionAnswerIndex !== -1) {
        answers[foundAnswerIndex].answersIds.splice(foundQuestionAnswerIndex, 1);
        if (answers[foundAnswerIndex].answersIds.length === 0) {
          answers.splice(foundAnswerIndex, 1);
        }
      }
      // Проверки на добавление при multiple true/false
      else if (question.multiple) {
        answers[foundAnswerIndex].answersIds.push(answer_id);
      } else {
        answers[foundAnswerIndex].answersIds = [answer_id];
      }
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
        answers: this.getState().answers,
      }
    }
    const res = await this.services.api.request<ITaskResponseFinish>({
      url: `/api/v1/student/task/test/finish`,
      method: "POST",
      body: JSON.stringify(data)
    });
    console.log(res);
    if (res.data.status == "success") {
      this.setState(
        {
          ...this.getState(),
          mark: res.data.data.score,
          waiting: false,
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

export default MultipleTestState;
