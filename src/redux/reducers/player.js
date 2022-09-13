import { GET_USER_INFO, RESET_SCORE, SET_SCORE } from '../actions/actionsTypes';

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

  case RESET_SCORE:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };

  default: return state;
  }
};

export default player;
