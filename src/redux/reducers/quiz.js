import {
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCES,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZ_SUCCES,
    QUIZ_SET_STATE,
    QUIZ_NEXT_QUESTION,
    QUIZ_FINISH,
    RESTART_QUIZ} from "../actions/actionTypes"

const initialState = {
    quizes: [],
    loader: false,
    error: null,
    isFinished: false,
    answerResult: null,
    answerNumber: 0,
    result: {},
    quiz: null,
}

export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZES_START:
            return {
                ...state, loader: true
            }
        case FETCH_QUIZES_SUCCES:
            return {
                ...state, quizes: action.quizes, loader: false
            }
        case FETCH_QUIZES_ERROR:
            return {
                ...state, loader: false, error: action.error
            }
        case FETCH_QUIZ_SUCCES:
            return {
                ...state, quiz: action.quiz, loader: false
            }
        case QUIZ_SET_STATE:
            return {
                ...state, answerResult: action.answerResult, result: action.result
            }
        case QUIZ_NEXT_QUESTION:
            return {
                ...state, answerNumber: action.number, answerResult: null
            }
        case QUIZ_FINISH:
            return {
                ...state, isFinished: true
            }
        case RESTART_QUIZ:
            return {
                ...state, isFinished: false, answerResult: null, answerNumber: 0, result: {}
            }
        default:
            return state
    }
}