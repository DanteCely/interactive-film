import { SET_CURRENT_SCENE, SET_NEXT_SCENE } from './scenes.types';
import { arrayToMap, preloadNextScene } from '../../../utils';

const init = {
  scene: {
    current: null,
    next: null,
    optionChosen: false,
    isPrev: false,
  },
  script: null,
  options: null,
  previous: null,
  configs: {
    delayOptions: 5,
    skipSeconds: 10,
    prevScenesTitle: 'Escenas Previas',
    firstSceneId: undefined,
  },
};

const initialize = (data) => {
  const { script, options, previous, ...rest } = data;
  const _script = arrayToMap(script, 'id');
  const scene = { ...init.scene, current: _script.get(rest.configs.firstSceneId) };

  return {
    ...init,
    ...rest,
    scene,
    script: _script,
    options: arrayToMap(options, 'id'),
    previous: arrayToMap(previous, 'id'),
  };
};

const actions = {
  [SET_CURRENT_SCENE]: (state, payload) => {
    const { id, isPrev = false } = payload || {};
    const currentScene = id ? state.script.get(id) : state.scene.next;

    return { ...state, scene: { ...state.scene, current: currentScene, optionChosen: false, isPrev } };
  },
  [SET_NEXT_SCENE]: (state, id) => {
    const nextScene = state.script.get(id);

    preloadNextScene(nextScene);

    return { ...state, scene: { ...state.scene, next: nextScene, optionChosen: true } };
  },
};

export { actions as sceneActions, initialize as sceneInitialize };
