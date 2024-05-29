/* eslint-disable react/prop-types */

import { useEffect } from 'react';
import { usePlayer, useSceneManager, useScenes } from '../../contexts/SceneManager';
import { Controls } from '../';
import clsx from 'clsx';

const options = {
	controls: false,
	playsInline: false,
	autoPlay: false,
	muted: false,
	loop: false,
	preload: 'auto',
};

const namespace = 'player';

export const Player = (props) => {
	const { sources = [], onCurrentTime, onEnded, hiddenControls } = props;
	const { hiddenTransition, setHiddenTransition } = useSceneManager();
	const [state, dispatch] = useScenes();
	const { delayOptions, skipSeconds } = state.configs;
	const [{ paused, userActive }, events, videoRef] = usePlayer();
	const { onMouseEnter, onMouseLeave, onMouseMove, onClick, ...restEvents } = events;

	useEffect(() => {
		// TODO: Ajustar error -> DOMException: play() failed because the user didn't interact with the document first.
		videoRef.current?.load();
		videoRef.current?.play();

		setTimeout(() => setHiddenTransition(false), 2500); // TODO: Mejorar estrategia de no mostrar controls en cambios de video
	}, [sources]);

	const onDurationChange = () => {
		if (state.scene.isPrev) {
			const { decisionTime } = state.scene.current;
			const { duration } = videoRef.current || {};
			videoRef.current.currentTime = duration - (delayOptions + decisionTime + skipSeconds * 3);
		}
	};

	const onTimeUpdate = (event) => {
		if (typeof onCurrentTime === 'function') onCurrentTime(event?.target || {});
	};

	const userAgentProps = {
		onMouseEnter: () => onMouseEnter(videoRef.current),
		onMouseLeave: () => onMouseLeave(videoRef.current),
		onMouseMove: () => onMouseMove(videoRef.current),
	};

	const className = clsx(namespace, { [`${namespace}--hidden-cursor`]: !userActive });

	return (
		<article className={className} {...userAgentProps}>
			<video
				ref={videoRef}
				onClick={() => !hiddenControls && onClick(videoRef.current)}
				onTimeUpdate={onTimeUpdate}
				onEnded={onEnded}
				onDurationChange={onDurationChange}
				{...restEvents}
				{...options}
			>
				{sources.map((source) => (
					<source key={source.src} {...source} />
				))}
			</video>
			<Controls isActive={userActive} paused={paused} hidden={hiddenControls || hiddenTransition} />
		</article>
	);
};
