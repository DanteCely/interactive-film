import { useContext } from 'react';
import { context } from '../context';

export const useSceneManager = () => {
  return useContext(context);
};
