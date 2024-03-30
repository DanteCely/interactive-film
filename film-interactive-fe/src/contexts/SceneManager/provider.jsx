/* eslint-disable react/prop-types */
import { Provider } from './context';
import { useState } from 'react';
import { TYPE } from '../../constants'
import { useRef } from 'react';

let videoEl = null;
let sourcesEl = [];

export const SceneManagerProvider = (props) => {
  const { children, script, options, prevOptions, isMobile, delayOptions, skipSeconds } = props;
  const videoRef = useRef(null);

  const [currentScene, setCurrentScene] = useState(script.get('scene_1'));
  const [nextScene, setNextScene] = useState();

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
  }

  const goToNextScene = () => {
    setCurrentScene(nextScene);
  }

  const goToPrevScene = (id) => {
    const prevScene = script.get(id);
    setCurrentScene({...prevScene, isPrev: true});
  }

  const getObjectList = (keys = [], type) => {
    if (keys && type === TYPE.options) return keys.map(key => options.get(key));
    else if (keys && type === TYPE.prev_options) return keys.map(key => prevOptions.get(key));
    else return [];
  }

  const value = {
    delayOptions,
    skipSeconds,
    isMobile,
    currentScene,
    goToNextScene,
    onChosenNextScene,
    goToPrevScene,
    getObjectList,
    videoRef,
  }

  return <Provider value={value}>{children}</Provider>;
}
