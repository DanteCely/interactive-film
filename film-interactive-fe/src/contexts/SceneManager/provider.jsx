/* eslint-disable react/prop-types */
import { Provider } from './context';
import { useState } from 'react';

let videoEl = null;
let sourcesEl = [];

export const SceneManagerProvider = (props) => {
  const { children, script, options, prevOptions, isMobile } = props;

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

  const getObjectList = (keys = [], type) => {
    if (keys && type === 'options') return keys.map(key => options.get(key));
    else if (keys && type === 'prevOptions') return keys.map(key => prevOptions.get(key));
    else return [];
  }

  const value = {
    isMobile,
    currentScene,
    goToNextScene,
    onChosenNextScene,
    getObjectList,
  }

  return <Provider value={value}>{children}</Provider>;
}
