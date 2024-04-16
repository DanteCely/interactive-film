import { useContext } from 'react';
import { context } from '../context';

export const useScenes = () => {
  const { scenes } = useContext(context);
  const { state, dispatch } = scenes;

  return [state, dispatch];
};
