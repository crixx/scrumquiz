import { put } from "redux-saga/effects";

import axios from "../../axios-highscore";
import * as actions from "../actions";

export function* fetchHighScoresSaga(action) {
    yield put(actions.fetchHighScoresStart());
    try {
        const response = yield axios.get(`/highscores/${action.name}.json`);
        yield put(actions.fetchHighScoresSuccess(action.name, response.data));
    } catch (error) {
        yield put(actions.fetchHighScoresFail(error));
    }
}

export function* addHighScoreSaga(action) {
    yield put(actions.addHighScoreStart());
    try {
        const response = yield axios.post(`/highscores/${action.name}.json`, action.highscore);
        yield put(actions.addHighScoreSuccess(action.name, response.data, action.highscore));
    } catch (error) {
        yield put(actions.addHighScoreFail(error));
    }
}