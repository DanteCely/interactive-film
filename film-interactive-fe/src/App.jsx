import clsx from 'clsx';
import filmScript from '../json/film-script.json';
import { Film } from './pages/Film';
import { SceneManagerProvider } from './contexts/SceneManager';
import { useEffect, useState } from 'react';
import { useEventListener } from './hooks';
import { isDeviceMobile } from './utils';

const namespace = 'app';

const App = () => {
	const [isMobile, setIsMobile] = useState(isDeviceMobile());
	const [fullscreen, setFullscreen] = useState(document.fullscreenElement);
	const classname = clsx(namespace, { mobile: isMobile });

	useEffect(() => {
		document.title = filmScript?.name;
	}, []);

	useEventListener('resize', () => setIsMobile(isDeviceMobile()));
	useEventListener('fullscreenchange', () => setFullscreen(document.fullscreenElement));

	return (
		<main className={classname}>
			<SceneManagerProvider fullscreen={fullscreen} isMobile={isMobile} sceneInit={filmScript}>
				<Film />
			</SceneManagerProvider>
		</main>
	);
};

export default App;
