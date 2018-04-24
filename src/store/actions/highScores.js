import * as actionTypes from "./actionTypes";

export const fetchHighScoresSuccess = (name, highscores) => {
    return {
        type: actionTypes.FETCH_HIGHSCORES_SUCCESS,
        name: name,
        highscores: highscores
    };
};

export const fetchHighScoresFail = error => {
    return {
        type: actionTypes.FETCH_HIGHSCORES_FAIL,
        error: error
    };
};

export const fetchHighScoresStart = () => {
    return {
        type: actionTypes.FETCH_HIGHSCORES_START
    };
};

export const fetchHighScores = name => {
    return {
        type: actionTypes.FETCH_HIGHSCORES,
        name: name
    };
};



export const addHighScoreSuccess = (name, key, highscore) => {
    return {
        type: actionTypes.ADD_HIGHSCORE_SUCCESS,
        name: name,
        key: key,
        highscore: highscore
    };
};

export const addHighScoreFail = error => {
    return {
        type: actionTypes.ADD_HIGHSCORE_FAIL,
        error: error
    };
};

export const addHighScoreStart = () => {
    return {
        type: actionTypes.ADD_HIGHSCORE_START
    };
};

export const addHighScore = (name, highScores) => {
    return {
        type: actionTypes.ADD_HIGHSCORE,
        name: name,
        highscore: highScores
    };
};
