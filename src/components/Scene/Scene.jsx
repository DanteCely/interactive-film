/* eslint-disable react/prop-types */
import { Player, Interactive } from '../';
import { useState, useMemo } from 'react';
import { useScenes, goToNextScene, useSceneManager } from '../../contexts/SceneManager';
import { TYPE } from '../../constants';
import { getObjectsFromList, goBack } from '../../utils';

const namespace = 'scene';

export const Scene = (props) => {
	const { type, defaultOption, options: _options, previous: _previous, decisionTime, sources } = props;

	const { setHiddenTransition } = useSceneManager();
	const [state, dispatch] = useScenes();
	const { skipSeconds, delayOptions } = state.configs;

	const [countDownOptions, setCountDownOptions] = useState();
	const [countDown, setCountDown] = useState();
	const options = useMemo(() => getObjectsFromList(_options, state.options), [_options]);

	const onEnded = () => {
		setCountDownOptions(undefined);
		goToNextScene(dispatch);
		setHiddenTransition(true);

		if (type === TYPE.last_scene) goBack();
	};

	const onCurrentTime = ({ currentTime, duration }) => {
		const _countDown = Math.round(duration - currentTime);
		const startTime = decisionTime + delayOptions;

		setCountDown(_countDown);
		if (_countDown <= startTime && _countDown >= delayOptions) setCountDownOptions(_countDown - delayOptions);
	};

	const playerProps = {
		sources,
		onCurrentTime,
		onEnded,
		hiddenControls: countDown <= decisionTime + delayOptions + skipSeconds * 2,
	};
	const interactiveProps = {
		total: decisionTime,
		currentTime: countDownOptions,
		defaultOption,
		options,
	};

	return (
		<main className={namespace}>
			<Player {...playerProps} />
			{!!options?.length && <Interactive {...interactiveProps} />}
		</main>
	);
};
