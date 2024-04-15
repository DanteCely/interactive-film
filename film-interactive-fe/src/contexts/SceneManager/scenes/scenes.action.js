import { SET_NEXT_SCENE, SET_CURRENT_SCENE } from './scenes.types';

export const goToNextScene = (dispatch) => {
  dispatch({ type: SET_CURRENT_SCENE });
};

export const goToPrevScene = (id, dispatch) => {
  dispatch({ type: SET_CURRENT_SCENE, payload: { id, isPrev: true } });
};
