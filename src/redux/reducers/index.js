import { combineReducers } from 'redux';
import { SAVE_LOGIN_DATA } from '../actions';

const INITIAL_STATE = {
  name: '',
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
  default:
    return state;
  }
};

const rootReducer = combineReducers({ gameReducer });

export default rootReducer;
