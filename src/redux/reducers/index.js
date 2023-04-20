import { combineReducers } from 'redux';
import { SAVE_LOGIN_DATA, SAVE_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  questions: [],
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
  case SAVE_QUESTIONS: {
    return {
      ...state,
      questions: action.payload.questions,
    };
  }
  default:
    return state;
  }
};

const rootReducer = combineReducers({ gameReducer });

export default rootReducer;
