/* eslint-disable react/prop-types */
import { Provider } from './context';

export const SceneManagerProvider = (props) => {
  const { children, script } = props;



  // const currentScene = script[0];
  // const nextScene;



  const onChosenNextScene = (id) => {
    const nextVideo = new Audio("siguiente_video.mp4");
    nextVideo.load();
  }

  const value = {
    onChosenNextScene,
  }

  return <Provider value={value}>{children}</Provider>;
}
