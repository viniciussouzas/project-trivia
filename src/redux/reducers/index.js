import { combineReducers } from 'redux';
import { SAVE_LOGIN_DATA, SAVE_SCORE } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    gravatarEmail: '',
    assertions: 0,
    score: 0,
  },
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_LOGIN_DATA: {
    return {
      ...state,
      player: {
        ...state.player,
        name: action.payload.name,
        gravatarEmail: action.payload.email,
      },
    };
  }
  case SAVE_SCORE: {
    return {
      ...state,
      player: {
        ...state.player,
        score: state.player.score + action.payload.score,
      },
    };
  }
  default:
    return state;
  }
};

const rootReducer = combineReducers({ gameReducer });

export default rootReducer;
