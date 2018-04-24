import { takeEvery, all, takeLatest } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga
} from "./auth";
import { addHighScoreSaga, fetchHighScoresSaga } from "./highScore";

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
  ]);
}

export function* watchHighScore() {
  yield takeEvery(actionTypes.FETCH_HIGHSCORES, fetchHighScoresSaga);
  // just to showcase the takeLatest effect: cancels previus ADD_HIGHSCORE actions
  // and runs only the latest instead
  yield takeLatest(actionTypes.ADD_HIGHSCORE, addHighScoreSaga);
}
