import { GET_USER_INFO } from './actionsTypes';

const userInfoAction = (name, gravatarEmail) => ({
  type: GET_USER_INFO,
  payload: {
    name,
    gravatarEmail,
  },
});

export default userInfoAction;
