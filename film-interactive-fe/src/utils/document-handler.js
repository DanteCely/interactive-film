import { mobileRegex } from '../constants';

let videoEl = null;
let sourcesEl = [];
let once = true;

const fullScreenOnce = (paused) => {
	const canFullscreen =
		!document.fullscreenElement && typeof document?.documentElement?.requestFullscreen === 'function';

	if (once && paused && canFullscreen) {
		document.documentElement.requestFullscreen();
		once = false;
	}
};

export const playPause = (target = {}) => {
	const { paused } = target;

	if (paused) target.play();
	else target.pause();

	fullScreenOnce(paused);
};

export const preloadNextScene = (nextScene) => {
	videoEl = document.createElement('video');
	videoEl.preload = 'metadata';
	sourcesEl = nextScene.sources.map(({ src, type }) => {
		const sourceEl = document.createElement('source');

		sourceEl.src = src;
		sourceEl.type = type;

		return sourceEl;
	});
	videoEl.append(...sourcesEl);
	videoEl.load();
};

export const skip = (seconds = 0, target = {}) => {
	target.currentTime += seconds;
};

export const toggleFullScreen = () => {
	if (!document.fullscreenElement) {
		document.documentElement.requestFullscreen();
	} else if (document.exitFullscreen) {
		document.exitFullscreen();
	}
};

export const goBack = () => {
	window.history.go(-1);
};

export const isDeviceMobile = () => mobileRegex.some((expresion) => navigator.userAgent.match(expresion));
