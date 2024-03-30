/* eslint-disable react/prop-types */
import { Player, Interactive } from '../';
import { useState, useMemo } from 'react';
import { useScene } from '../../contexts/SceneManager';
import { TYPE } from '../../constants';

const namespace = 'scene';
// TODO: realizar comportamiento para los tipos scene, closing_scene & credits
export const Scene = (props) => {
  const { type, defaultOption, options: _options, prevOptions: _prevOptions, decisionTime, sources } = props;

  const { goToNextScene, getObjectList, delayOptions, skipSeconds, videoRef } = useScene();
  const [countDownOptions, setCountDownOptions] = useState();
  const [countDown, setCountDown] = useState();
  const options = useMemo(() => getObjectList(_options, TYPE.options), [_options]);

  const onEnded = () => {
    setCountDownOptions(undefined);
    goToNextScene();
  };

  const onCurrentTime = ({ currentTime, duration }) => {
    const _countDown = Math.round(duration - currentTime);
    const startTime = decisionTime + delayOptions;

    setCountDown(_countDown);
    if (_countDown <= startTime && _countDown >= delayOptions) setCountDownOptions(_countDown - delayOptions);
  };

  const playerProps = {
    sources,
    onCurrentTime,
    onEnded,
    hiddenControls: countDown <= decisionTime + delayOptions + skipSeconds * 2,
  };
  const interactiveProps = {
    total: decisionTime,
    currentTime: countDownOptions,
    defaultOption,
    options,
  };

  return (
    <main className={namespace}>
      <Player {...playerProps} />
      <Interactive {...interactiveProps} />
    </main>
  );
};
