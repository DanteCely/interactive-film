/* eslint-disable react/prop-types */
import { Provider } from './context';
import { TYPE } from '../../constants';
import { playerInit, playerActions } from './player';
import { sceneActions, sceneInitialize } from './scenes';
import { reducer } from '../../utils';
import { useReducer, useState, useRef } from 'react';

// TODO: Reordenar componentes del contexto
// TODO: Subir Videos e Imáges a una CDN
// TODO: Desplegar App en un hosting
export const SceneManagerProvider = (props) => {
	const { children, fullscreen, isMobile, sceneInit } = props;
	const videoRef = useRef(null);

	const [playerState, playerDispatch] = useReducer(reducer(playerActions), playerInit);
	const [sceneState, sceneDispatch] = useReducer(reducer(sceneActions), sceneInit, sceneInitialize);
	const [hiddenTransition, setHiddenTransition] = useState(false); // TODO: Reorganizar

	const value = {
		player: {
			state: playerState,
			dispatch: playerDispatch,
			videoRef,
		},
		scenes: {
			state: sceneState,
			dispatch: sceneDispatch,
		},
		isMobile,
		fullscreen,
		hiddenTransition,
		setHiddenTransition,
	};

	return <Provider value={value}>{children}</Provider>;
};
