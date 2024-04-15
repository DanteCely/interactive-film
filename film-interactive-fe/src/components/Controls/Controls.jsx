import { useMemo } from 'react';
import clsx from 'clsx';
import { Icon, PrevOptions } from '../';
import { useSceneManager, useScenes } from '../../contexts/SceneManager';
import { TYPE } from '../../constants';
import { playPause, skip } from '../../utils';
import { getObjectsFromList } from '../../utils';

const namespace = 'controls';

export const Controls = (props) => {
  const { isActive, paused } = props;
  const { isMobile } = useSceneManager();
  const [state, dispatch] = useScenes();
  const { skipSeconds } = state.configs;
  const { previous: _previous } = state.scene.current || {};
  const previous = useMemo(() => getObjectsFromList(_previous, state.previous), [_previous]);

  const role = isMobile ? 'button' : 'img';
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
      {!!previous?.length && (
        <PrevOptions
          className={`${namespace}__prev-scenes`}
          options={previous}
        />
      )}
    </section>
  );
};
