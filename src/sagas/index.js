import { all, fork } from 'redux-saga/effects';
import { watcherGetQuestionSaga, watcherSubmitAnswerSaga } from './questionsSaga';
import { watcherGetAnswerSaga } from './answersSaga';

export default function* rootSaga() {
  yield all([fork(watcherGetQuestionSaga), fork(watcherSubmitAnswerSaga), fork(watcherGetAnswerSaga)]);
}
