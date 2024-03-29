import { useScene } from '../../contexts/SceneManager';
import { Scene } from '../../components';

export const Film = () => {
    const { currentScene } = useScene();

    return <Scene {...currentScene} delay={5} />
}