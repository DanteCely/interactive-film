import { useScenes } from '../../contexts/SceneManager';
import { Scene } from '../../components';

export const Film = () => {
	const [state] = useScenes();

	return <Scene {...state.scene.current} />;
};
