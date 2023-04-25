export const SAVE_LOGIN_DATA = 'SAVE_LOGIN_DATA';
export const SAVE_SCORE = 'SAVE_SCORE';

export const saveLoginData = (name, email) => ({
  type: SAVE_LOGIN_DATA,
  payload: {
    name,
    email,
  },
});

export const saveScore = (score) => ({
  type: SAVE_SCORE,
  payload: {
    score,
  },
});
