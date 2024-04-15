import { context } from '../context';
import { SET_PAUSED, activeTempUser, activeUser, deactiveUser } from '../player';
import { throttle, playPause } from '../../../utils';
import { useContext } from 'react';

export const usePlayer = () => {
	const {
		player: { state, dispatch, videoRef },
		isMobile,
	} = useContext(context);

	const { userActive, timeActive } = state;

	const onPlay = () => {
		activeTempUser(timeActive, dispatch);
		dispatch({ type: SET_PAUSED, payload: false });
	};

	const onPause = () => {
		activeUser(dispatch);
		dispatch({ type: SET_PAUSED, payload: true });
	};

	const onClick = (event) => {
		if (!isMobile) playPause(event);
	};

	const onMouseEnter = (event) => {
		const { paused } = event || {};

		if (!paused && !isMobile) activeTempUser(timeActive, dispatch);
	};

	const onMouseLeave = (event) => {
		const { paused } = event || {};

		if (!paused && !isMobile) deactiveUser(dispatch);
	};

	const onMouseMove = throttle((event) => {
		const { paused } = event || {};

		if (!paused && !isMobile) activeTempUser(timeActive, dispatch);
	}, 500);

	const onTouchEnd = (event) => {
		const { paused } = event?.currentTarget || {};

		if (paused) {
			if (userActive) deactiveUser(dispatch);
			else activeUser(dispatch);
		} else {
			if (userActive) deactiveUser(dispatch);
			else activeUser(dispatch);
		}
	};

	const events = {
		onMouseEnter,
		onMouseLeave,
		onMouseMove,
		onTouchEnd,
		onPlay,
		onPause,
		onClick,
	};

	return [state, events, videoRef];
};
