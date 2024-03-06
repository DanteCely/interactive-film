/* eslint-disable react/prop-types */
import { Provider } from './context';
import { useCallback, useState, useMemo } from 'react';

const arrayToMap = (array, key) => {
  const myMap = new Map();

  array.forEach(element => {
    myMap.set(element[key], element);
  });

  return myMap;
}

let videoEl = null;
let sourcesEl = [];

export const SceneManagerProvider = (props) => {
  const { children, script } = props;

  const film = useMemo(() => arrayToMap(script, 'id'), [script]);
  const [currentScene, setCurrentScene] = useState(film.get('scene_1'));
  const [nextScene, setNextScene] = useState();

  const onChosenNextScene = (id) => {
    const nextScene = film.get(id);

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

    setNextScene(film.get(id));
  }

  const goToNextScene = () => {
    setCurrentScene(nextScene);
  }

  const value = {
    currentScene,
    goToNextScene,
    onChosenNextScene,
  }

  return <Provider value={value}>{children}</Provider>;
}
