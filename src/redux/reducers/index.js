import { combineReducers } from 'redux';
import { SAVE_CORRECT_ANSWER, SAVE_LOGIN_DATA } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  correctAnswer: 0,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_LOGIN_DATA: {
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
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

const rootReducer = combineReducers({ gameReducer });

export default rootReducer;
