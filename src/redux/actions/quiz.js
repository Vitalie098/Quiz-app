import axios from "../../Axios/Axios-quiz"
import {
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCES,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZ_SUCCES,
    QUIZ_FINISH,
    QUIZ_NEXT_QUESTION,
    QUIZ_SET_STATE,
    RESTART_QUIZ} from "./actionTypes"

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())

        try {
            const response = await axios.get("/quizes.json")
            const quizes = []

            Object.keys(response.data).forEach((key,index) => {
                quizes.push({
                    id: key,
                    name: `Test ${index + 1}`
                })
            })

            dispatch(fetchQuizesSucces(quizes))
        }catch (err) {
            dispatch(fetchQuizesError(err))
        }
    }
}


export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSucces(quizes) {
    return {
        type: FETCH_QUIZES_SUCCES,
        quizes
    }
}

export function fetchQuizesError(err) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: err
    }
}

export function fetchQuiz(id) {
    return async dispatch => {
        dispatch(fetchQuizesStart())

        try {
            const response = await axios.get(`/quizes/${id}.json`)
            const quiz = response.data

            dispatch(fetchQuizSucces(quiz))

        }catch (err) {
            dispatch(fetchQuizesError(err))
        }
    }
}

export function answerClickHandler(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz

        if (state.answerResult) {
            const key = Object.keys(state.answerResult)[0]
            if (state.answerResult[key] === "success") {
                return
            }
        }

        const question = state.quiz[state.answerNumber]
        const result = state.result

        if(question.rightAnswer === answerId) {
            if(!result[question.id]) {
                result[question.id] = "success"
            }


            dispatch(quizSetState({[answerId]: "success"},result))

            const timeout = setTimeout(() => {
                if(isFinished(state)) {
                    dispatch(quizFinish())
                }else {
                    dispatch(quizNextQuestion(state.answerNumber + 1))
                }

                window.clearInterval(timeout)
            }, 1000)
        } else {
            result[question.id] = "error"
            dispatch(quizSetState({[answerId]: "error"},result))
        }

    }
}

export function fetchQuizSucces(quiz) {
    return {
        type: FETCH_QUIZ_SUCCES,
        quiz
    }
}

export function quizSetState(answerResult,result) {
    return {
        type: QUIZ_SET_STATE,
        answerResult,result
    }
}

export function quizNextQuestion(number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        number
    }
}

export function quizFinish() {
    return {
        type: QUIZ_FINISH
    }
}

export function isFinished(state) {
    return state.answerNumber + 1 === state.quiz.length
}

export function RestartQuiz() {
    return {
        type: RESTART_QUIZ
    }
}