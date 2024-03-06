/* eslint-disable react/prop-types */
import { Provider } from './context';
import { useCallback, useState, useMemo  } from 'react';

const arrayToMap = (array, key) => {
  const myMap = new Map();

  array.forEach(element => {
    myMap.set(element[key], element);
  });

  return myMap;
}

export const SceneManagerProvider = (props) => {
  const { children, script } = props;

  const film = useMemo(() => arrayToMap(script, 'id'), [script]);
  const [currentScene, setCurrentScene] = useState(film.get('scene_1'));
  const [nextScene, setNextScene] = useState();

  const onChosenNextScene = (id) => {
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
