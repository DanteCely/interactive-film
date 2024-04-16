import { SET_USER_ACTIVE } from './player.types';

let activeTimeId = undefined;

export const activeTempUser = (time, dispatch) => {
  dispatch({ type: SET_USER_ACTIVE, payload: true });
  clearTimeout(activeTimeId);

  activeTimeId = setTimeout(() => {
    dispatch({ type: SET_USER_ACTIVE, payload: false });
    clearTimeout(activeTimeId);
  }, time);
};

export const activeUser = (dispatch) => {
  dispatch({ type: SET_USER_ACTIVE, payload: true });
  clearTimeout(activeTimeId);
};

export const deactiveUser = (dispatch) => {
  dispatch({ type: SET_USER_ACTIVE, payload: false });
  clearTimeout(activeTimeId);
};
