import { GET_USER_INFO, SET_SCORE } from '../actions/actionsTypes';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_USER_INFO:
    return {
      ...state,
      ...action.payload,
    };

  case SET_SCORE:
    return {
      ...state,
      score: state.score + Number(action.points),
      assertions: action.assertions,
    };

  default: return state;
  }
};

export default player;
