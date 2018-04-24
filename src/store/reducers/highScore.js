import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    highscores: {
        psm1: {
        }
    },
    loading: false
};


const fetchHighScoresStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const fetchHighScoresSuccess = (state, action) => {
    const highscores = { ...state.highscores };
    highscores[action.name] = action.highscores ? action.highscores : {};
    return updateObject(state, {
        highscores: highscores,
        loading: false
    });
};

const fetchHighScoresFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const addHighScoreStart = (state, action) => {
    return updateObject(state, { loading: true });
};
const addHighScoreSuccess = (state, action) => {
    const highscores = { ...state.highscores };
    console.log(action);
    highscores[action.name][action.key] = action.highscore;
    return updateObject(state, {
        highscores: highscores,
        loading: false
    });
};
const addHighScoreFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_HIGHSCORES_START: return fetchHighScoresStart(state, action);
        case actionTypes.FETCH_HIGHSCORES_SUCCESS: return fetchHighScoresSuccess(state, action);
        case actionTypes.FETCH_HIGHSCORES_FAIL: return fetchHighScoresFail(state, action);
        case actionTypes.ADD_HIGHSCORE_START: return addHighScoreStart(state, action);
        case actionTypes.ADD_HIGHSCORE_SUCCESS: return addHighScoreSuccess(state, action);
        case actionTypes.ADD_HIGHSCORE_FAIL: return addHighScoreFail(state, action);
        default: return state;
    }
};

export default reducer;