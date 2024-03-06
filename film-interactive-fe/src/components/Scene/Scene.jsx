/* eslint-disable react/prop-types */
import { Player, Interactive } from '../'
import { useState, useMemo } from 'react';
import { useScene } from '../../contexts/SceneManager';

const namespace = 'scene';

const TYPE = {
  scene: 'scene',
  closing_scene: 'closing_scene'
}

export const Scene = (props) => {
  const { type, defaultOption, options, decisionTime, sources, animationTime } = props;

  const { goToNextScene } = useScene();
  const totalTime = useMemo(() => decisionTime + animationTime, [decisionTime]);
  const [countDown, setCountDown] = useState();

  const onEnded = () => {
    setCountDown(undefined);
    goToNextScene();
  }

  const onCurrentTime = ({ currentTime, duration }) => {
    const restTime = Math.round(duration - currentTime) - animationTime;

    if (restTime >= 0 && restTime <= totalTime && currentTime <= duration) setCountDown(restTime);
    else setCountDown(undefined);
  }

  const playerProps = { sources, onCurrentTime, onEnded };
  const interactiveProps = { total: totalTime, currentTime: countDown, defaultOption, options };

  return <main className={namespace}>
    <Player {...playerProps} />
    {type === TYPE.scene && <Interactive {...interactiveProps} />}
  </main>
}
