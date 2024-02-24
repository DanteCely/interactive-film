/* eslint-disable react/prop-types */
import { Player, Interactive } from '../'
import { useState } from 'react';

const namespace = 'scene';

export const Scene = (props) => {
  const { defaultOption, options, startAt, sources } = props;

  const [ready, setReady] = useState();
  const [once, setOnce] = useState(false);

  const onEnded = () => {
    setReady(null);
    setOnce(false);
  }

  const onCurrentTime = ({ currentTime, duration }) => {
    const restTime = duration - currentTime;
    if (!once && restTime < startAt) {
      setReady(Math.floor(restTime));
      setOnce(true);
    } else if (once && restTime > startAt) {
      setReady(null);
      setOnce(false);
    }
  }

  return <main className={namespace}>
    <Player sources={sources} onCurrentTime={onCurrentTime} onEnded={onEnded} />
    {ready && <Interactive countDown={ready} defaultOption={defaultOption} options={options} />}
  </main>
}
