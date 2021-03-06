import { takeLatest, call, put } from 'redux-saga/effects';
import {
  API_GET_QUESTION_FAILURE,
  API_GET_QUESTION_REQUEST,
  API_GET_QUESTION_SUCCESS,
  API_SUBMIT_ANSWER_FAILURE,
  API_SUBMIT_ANSWER_REQUEST,
  API_SUBMIT_ANSWER_SUCCESS,
} from '../actions/types';

import { API_QUESTIONS, API_SERVER, API_ANSWERS } from '../api';

import { getApi, postApi } from '../utils/apiUtils';

// worker saga: makes the api call when watcher saga sees the action
function* submitAnswerSaga(action) {
  const answer = action.payload;
  try {
    const response = yield call(postApi, `${API_SERVER}${API_ANSWERS}submit/`, null, answer );
    console.log('submit answer response: ', response);
    // dispatch a success action to the store with the new dog
    yield put({ type: API_SUBMIT_ANSWER_SUCCESS, payload: response });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: API_SUBMIT_ANSWER_FAILURE, error });
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSubmitAnswerSaga() {
  yield takeLatest(API_SUBMIT_ANSWER_REQUEST, submitAnswerSaga);
}

// worker saga: makes the api call when watcher saga sees the action
function* getQuestionSaga(action) {
  const { questionID } = action;
  try {
    const response = yield call(getApi, `${API_SERVER}${API_QUESTIONS}${questionID}/`, null);
    console.log('get question response: ', response);
    const questions = response;
    // dispatch a success action to the store with the new dog
    yield put({ type: API_GET_QUESTION_SUCCESS, questions });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: API_GET_QUESTION_FAILURE, error });
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherGetQuestionSaga() {
  yield takeLatest(API_GET_QUESTION_REQUEST, getQuestionSaga);
}
