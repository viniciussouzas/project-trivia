export const SAVE_LOGIN_DATA = 'SAVE_LOGIN_DATA';
export const SAVE_CORRECT_ANSWER = 'SAVE_CORRECT_ANSWER';

export const saveLoginData = (name, email) => ({
  type: SAVE_LOGIN_DATA,
  payload: {
    name,
    email,
  },
});

export const saveCorrectAnswer = (number) => ({
  type: SAVE_CORRECT_ANSWER,
  payload: {
    number,
  },
});
