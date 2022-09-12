import { GET_USER_INFO, SET_SCORE } from './actionsTypes';

export const userInfoAction = (name, gravatarEmail) => ({
  type: GET_USER_INFO,
  payload: {
    name,
    gravatarEmail,
  },
});

export const setScore = () => ({
  type: SET_SCORE,
});
