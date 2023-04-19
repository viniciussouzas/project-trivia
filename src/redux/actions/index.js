export const SAVE_LOGIN_DATA = 'SAVE_LOGIN_DATA';

export const saveLoginData = (name, email) => ({
  type: SAVE_LOGIN_DATA,
  payload: {
    name,
    email,
  },
});
