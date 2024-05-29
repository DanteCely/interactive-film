import { useEffect, useMemo } from 'react';
import clsx from 'clsx';
import { Icon, PrevOptions } from '../';
import { useSceneManager, useScenes, usePlayer } from '../../contexts/SceneManager';
import { useEventListener } from '../../hooks';
import { play, playPause, skip, toggleFullScreen, goBack } from '../../utils';
import { getObjectsFromList } from '../../utils';

const namespace = 'controls';

export const Controls = (props) => {
	const { isActive, paused, hidden } = props;
	const { isMobile, fullscreen } = useSceneManager();
	const [state, dispatch] = useScenes();
	const [, , videoRef] = usePlayer();
	const { skipSeconds } = state.configs;
	const { previous: _previous } = state.scene.current || {};
	const previous = useMemo(() => getObjectsFromList(_previous, state.previous), [_previous]);

	const role = isMobile ? 'button' : 'img';
	const classnames = clsx(namespace, { [`${namespace}--hidden`]: !isActive || hidden });

	useEffect(() => {
		if (hidden && videoRef.current.paused) play(videoRef.current);
	}, [hidden]);

	const onSkip = (seconds) => {
		const videoEl = document.querySelector('video');
		skip(seconds, videoEl);
	};

	useEventListener('keydown', ({ code }) => {
		const keyAction = {
			KeyF: () => toggleFullScreen(),
			Space: () => playPause(videoRef.current),
			ArrowRight: () => onSkip(skipSeconds), // TODO: Impedir que que haga skip cuando tenemos estado hidden
			ArrowLeft: () => onSkip(-skipSeconds), // TODO: Impedir que que haga skip cuando tenemos estado hidden
		};

		const action = keyAction[code];
		if (typeof action === 'function') action();
	});

	return (
		<section className={classnames}>
			<Icon role={role} onClick={goBack} className={`${namespace}__arrow-back`}>
				arrow_back
			</Icon>
			<Icon role={role} onClick={() => playPause(videoRef.current)} className={`${namespace}__big-play`}>
				{paused ? 'play_circle' : 'pause_circle'}
			</Icon>
			<Icon role={role} onClick={() => onSkip(skipSeconds)} className={`${namespace}__forward`}>
				forward_10
			</Icon>
			<Icon role={role} onClick={() => onSkip(-skipSeconds)} className={`${namespace}__backward`}>
				replay_10
			</Icon>
			{!!previous?.length && <PrevOptions className={`${namespace}__prev-scenes`} options={previous} />}
			<Icon role={role} onClick={() => toggleFullScreen()} className={`${namespace}__fullscreen`}>
				{fullscreen ? 'fullscreen_exit' : 'fullscreen'}
			</Icon>
		</section>
	);
};
