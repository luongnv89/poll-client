import {
  API_GET_QUESTION_FAILURE,
  API_GET_QUESTION_REQUEST,
  API_GET_QUESTION_SUCCESS,
  API_SUBMIT_ANSWER_FAILURE,
  API_SUBMIT_ANSWER_REQUEST,
  API_SUBMIT_ANSWER_SUCCESS,
} from '../actions/types';

// reducer with initial state

const initialState = {
  fetching: false,
  questions: null,
  error: null,
  redirectToAnswer: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case API_GET_QUESTION_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case API_GET_QUESTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        questions: action.questions,
      };
    case API_GET_QUESTION_FAILURE:
      return {
        ...state,
        fetching: false,
        questions: null,
        error: action.error,
      };
    case API_SUBMIT_ANSWER_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case API_SUBMIT_ANSWER_SUCCESS:
      return {
        ...state,
        fetching: false,
        redirectToAnswer: true,
      };
    case API_SUBMIT_ANSWER_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
