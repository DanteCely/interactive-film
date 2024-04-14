/* eslint-disable react/prop-types */
import { Provider } from './context';
import { TYPE } from '../../constants';
import { playerInit, playerActions } from './player';
import { reducer } from '../../utils';
import { useReducer, useState, useRef } from 'react';

let videoEl = null;
let sourcesEl = [];

// TODO: Reordenar componentes del contexto
// TODO: Subir Videos e Imáges a una CDN
// TODO: Desplegar App en un hosting
export const SceneManagerProvider = (props) => {
  const { children, delayOptions, isMobile, options, prevOptions, script, skipSeconds } = props;
  const videoRef = useRef(null);

  const [playerState, playerDispatch] = useReducer(reducer(playerActions), playerInit);

  // ======================
  const [currentScene, setCurrentScene] = useState(script.get('scene_1'));
  const [nextScene, setNextScene] = useState();
  const [hiddenTransition, setHiddenTransition] = useState(false);

  const onChosenNextScene = (id) => {
    const nextScene = script.get(id);

    videoEl = document.createElement('video');
    videoEl.preload = 'auto';
    sourcesEl = nextScene.sources.map(({ src, type }) => {
      const sourceEl = document.createElement('source');

      sourceEl.src = src;
      sourceEl.type = type;

      return sourceEl;
    });
    videoEl.append(...sourcesEl);
    videoEl.load();

    setNextScene(script.get(id));
  };

  const goToNextScene = () => {
    setCurrentScene(nextScene);
    setHiddenTransition(true);
  };

  const goToPrevScene = (id) => {
    const prevScene = script.get(id);
    setCurrentScene({ ...prevScene, isPrev: true });
  };

  const getObjectList = (keys = [], type) => {
    if (keys && type === TYPE.options) return keys.map((key) => options.get(key));
    else if (keys && type === TYPE.prev_options) return keys.map((key) => prevOptions.get(key));
    else return [];
  };

  const value = {
    player: {
      state: playerState,
      dispatch: playerDispatch,
    },
    isMobile,
    // ================
    currentScene,
    delayOptions,
    getObjectList,
    goToNextScene,
    goToPrevScene,
    hiddenTransition,

    onChosenNextScene,
    setHiddenTransition,
    skipSeconds,
    videoRef,
  };

  return <Provider value={value}>{children}</Provider>;
};
