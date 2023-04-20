import { getQuestions } from '../../services/fetchApi';

export const SAVE_LOGIN_DATA = 'SAVE_LOGIN_DATA';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';

export const saveLoginData = (name, email) => ({
  type: SAVE_LOGIN_DATA,
  payload: {
    name,
    email,
  },
});

const saveQuestions = (questions) => ({
  type: SAVE_QUESTIONS,
  payload: {
    questions,
  },
});

export const saveQuestionsThunk = () => async (dispatch) => {
  const results = await getQuestions();
  dispatch(saveQuestions(results));
};
