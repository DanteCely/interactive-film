import { useContext } from 'react';
import { context } from '../context';

export const useScene = () => {
    return useContext(context);
}