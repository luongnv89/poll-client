import { takeLatest, call, put } from 'redux-saga/effects';
import {
  API_GET_ANSWER_FAILURE,
  API_GET_ANSWER_REQUEST,
  API_GET_ANSWER_SUCCESS,
} from '../actions/types';

import { API_SERVER, API_ANSWERS } from '../api';

import { getApi } from '../utils/apiUtils';

// worker saga: makes the api call when watcher saga sees the action
function* getAnswerSaga(action) {
  const { questionID } = action;
  try {
    const response = yield call(getApi, `${API_SERVER}${API_ANSWERS}/${questionID}`, null);
    console.log('get answer response: ', response);
    const answers = response;
    // dispatch a success action to the store with the new dog
    yield put({ type: API_GET_ANSWER_SUCCESS, answers:[answers] });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: API_GET_ANSWER_FAILURE, error });
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherGetAnswerSaga() {
  yield takeLatest(API_GET_ANSWER_REQUEST, getAnswerSaga);
}
