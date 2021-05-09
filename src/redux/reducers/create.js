import {CREATE_QUIZ_QUESTION, FINISH_CREATE_QUIZ, RESET_QUIZ_CREATION} from "../actions/actionTypes";

const initialState = {
    quiz: []
}

export default function createReducer(state = initialState, action) {
    switch(action.type) {
        case CREATE_QUIZ_QUESTION:
            return {
                quiz: [...state.quiz,action.item]
            }
        case RESET_QUIZ_CREATION:
            return {
                quiz: []
            }
        default:
            return state
    }
}