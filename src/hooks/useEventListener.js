import { useEffect } from 'react';

export const useEventListener = (type, callback) => {
	useEffect(() => {
		window.addEventListener(type, callback);

		return () => {
			window.removeEventListener(type, callback);
		};
	}, []);
};
