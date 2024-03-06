import { useScene } from '../../contexts/SceneManager';
import { Scene } from '../../components';

const ANIMATION_TIME = 5;

export const Film = () => {
    const { currentScene } = useScene();

    return <Scene {...currentScene} animationTime={ANIMATION_TIME} />
}