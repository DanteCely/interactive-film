/* eslint-disable react/prop-types */
import { Player, Interactive } from '../'
import { useState } from 'react';

const namespace = 'scene';
const ANIMATION_TIME = 5;

export const Scene = (props) => {
  const { defaultOption, options, decisionTime, sources } = props;

  const [countDown, setCountDown] = useState();

  const onEnded = () => {
    setCountDown(undefined)
  }

  const onCurrentTime = ({ currentTime, duration }) => {
    const restTime = Math.round(duration - currentTime);

    if (restTime <= decisionTime && currentTime <= duration - ANIMATION_TIME) setCountDown(restTime);
    else setCountDown(undefined);
  }

  return <main className={namespace}>
    <Player sources={sources} onCurrentTime={onCurrentTime} onEnded={onEnded} />
    <Interactive total={decisionTime} currentTime={countDown} defaultOption={defaultOption} options={options} />
  </main>
}
