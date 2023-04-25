import { combineReducers } from 'redux';
import { SAVE_CORRECT_ANSWER, SAVE_LOGIN_DATA, SAVE_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  assertions: 0,
  score: 0,
  correctAnswer: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_LOGIN_DATA: {
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  }
  case SAVE_SCORE: {
    return {
      ...state,
      score: state.score + action.payload.score,
    };
  }
  case SAVE_CORRECT_ANSWER: {
    return {
      ...state,
      correctAnswer: state.correctAnswer + action.payload.number,
    };
  }
  default:
    return state;
  }
};

const rootReducer = combineReducers({ player });

export default rootReducer;
