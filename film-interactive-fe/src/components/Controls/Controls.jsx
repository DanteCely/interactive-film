import { useMemo } from 'react';
import clsx from 'clsx';
import { Icon, PrevOptions } from '../';
import { playPause, skip, useScene } from '../../contexts/SceneManager';
import { TYPE } from '../../constants';

const namespace = 'controls';

export const Controls = (props) => {
  const { isActive, paused } = props;
  const { currentScene, isMobile, getObjectList, skipSeconds } = useScene();
  const { prevOptions: _prevOptions } = currentScene;
  const prevOptions = useMemo(() => getObjectList(_prevOptions, TYPE.prev_options), [_prevOptions]);

  const classnames = clsx(namespace, { [`${namespace}--hidden`]: !isActive });
  const onPlayPause = () => {
    const videoEl = document.querySelector('video');

    playPause(videoEl);
  };
  const onSkip = (seconds) => {
    // TODO: Cuando está pausado en zona de desición darle play con playPause
    const videoEl = document.querySelector('video');
    skip(seconds, videoEl);
  };
  const role = isMobile ? 'button' : 'img';

  return (
    <section className={classnames}>
      <Icon
        role={role}
        onClick={onPlayPause}
        className={`${namespace}__big-play`}
      >
        {paused ? 'play_circle' : 'pause_circle'}
      </Icon>
      <Icon
        role={role}
        onClick={() => onSkip(skipSeconds)}
        className={`${namespace}__forward`}
      >
        forward_10
      </Icon>
      <Icon
        role={role}
        onClick={() => onSkip(-skipSeconds)}
        className={`${namespace}__backward`}
      >
        replay_10
      </Icon>
      {!!prevOptions?.length && (
        <PrevOptions
          className={`${namespace}__prev-scenes`}
          options={prevOptions}
        />
      )}
    </section>
  );
};
