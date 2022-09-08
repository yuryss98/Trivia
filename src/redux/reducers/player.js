import { GET_USER_INFO } from '../actions/actionsTypes';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

const getPlayer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_USER_INFO:
    return {
      ...state,
      ...action.payload,
    };
  default: return state;
  }
};

export default getPlayer;
