import { all, fork } from 'redux-saga/effects';
import { watcherGetQuestionSaga, watcherSubmitAnswerSaga } from './questionsSaga';

export default function* rootSaga() {
  yield all([fork(watcherGetQuestionSaga), fork(watcherSubmitAnswerSaga)]);
}
