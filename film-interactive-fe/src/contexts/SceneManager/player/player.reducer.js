import { SET_USER_ACTIVE, SET_PAUSED } from './player.types';

const init = {
  timeActive: 2500,
  userActive: true,
  paused: true,
};

const actions = {
  [SET_USER_ACTIVE]: (state, payload) => ({ ...state, userActive: payload }),
  [SET_PAUSED]: (state, payload) => ({ ...state, paused: payload }),
};

export { init as playerInit, actions as playerActions };
