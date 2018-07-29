import {
  API_GET_ANSWER_FAILURE,
  API_GET_ANSWER_REQUEST,
  API_GET_ANSWER_SUCCESS,
} from '../actions/types';

// reducer with initial state

const initialState = {
  fetching: false,
  answers: null,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case API_GET_ANSWER_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case API_GET_ANSWER_SUCCESS:
      return {
        ...state,
        fetching: false,
        answers: action.answers,
      };
    case API_GET_ANSWER_FAILURE:
      return {
        ...state,
        fetching: false,
        answers: null,
        error: action.error,
      };
    default:
      return state;
  }
}
