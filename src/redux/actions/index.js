import { GET_USER_INFO, RESET_SCORE, SET_SCORE } from './actionsTypes';

export const userInfoAction = (name, gravatarEmail) => ({
  type: GET_USER_INFO,
  payload: {
    name,
    gravatarEmail,
  },
});

export const setScore = (points, assertions) => ({
  type: SET_SCORE,
  points,
  assertions,
});

export const resetScore = () => ({
  type: RESET_SCORE,
});
