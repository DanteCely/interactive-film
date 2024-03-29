/* eslint-disable react/prop-types */
import { Player, Interactive } from '../'
import { useState, useMemo } from 'react';
import { useScene } from '../../contexts/SceneManager';
import { TYPE, SKIP_SEC } from '../../constants';

const namespace = 'scene';

export const Scene = (props) => {
  const {
    type,
    defaultOption,
    options: _options,
    prevOptions: _prevOptions,
    decisionTime,
    sources,
    delay,
  } = props;

  const { goToNextScene, getObjectList } = useScene();
  const [countDown, setCountDown] = useState();
  const options = useMemo(() => getObjectList(_options, TYPE.options), [_options]);
  const prevOptions = useMemo(() => getObjectList(_prevOptions, TYPE.prev_options), [_prevOptions]);

  const onEnded = () => {
    setCountDown(undefined);
    goToNextScene();
  }

  const onCurrentTime = ({ currentTime, duration }) => {
    const _countDown = Math.round(duration - currentTime);
    const startTime = decisionTime + delay;

    if (_countDown <= startTime && _countDown >= delay) setCountDown(_countDown - delay);
  }

  const playerProps = {
    sources,
    onCurrentTime,
    onEnded,
    hiddenControls: typeof countDown === 'number',
  };
  const interactiveProps = { total: decisionTime, currentTime: countDown, defaultOption, options };

  return <main className={namespace}>
    <Player {...playerProps} />
    <Interactive {...interactiveProps} />
  </main>
}
