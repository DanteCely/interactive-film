
/* eslint-disable react/prop-types */

import { useEffect, useRef } from "react";
import { usePlayer, useScene } from '../../contexts/SceneManager';
import { Controls } from '../';

const options = {
  controls: false,
  playsInline: false,
  autoPlay: false,
  muted: false,
  loop: false,
  preload: 'auto',
}

const namespace = 'player';

export const Player = (props) => {
  const { sources = [], onCurrentTime, onEnded, hiddenControls } = props;
  const { videoRef, isPrevChoosen, currentScene, delayOptions, skipSeconds } = useScene();
  const [{ paused, isActive }, events] = usePlayer();
  const {
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onClick,
    ...restEvents
  } = events;

  useEffect(() => {
    // TODO: DOMException: play() failed because the user didn't interact with the document first.
    videoRef.current?.load();
    videoRef.current?.play();
  }, [sources, isPrevChoosen]);

  const onDurationChange = () => {
    if (currentScene.isPrev) {
      const { decisionTime } = currentScene;
      const { duration } = videoRef.current || {};
      videoRef.current.currentTime = duration - (delayOptions + decisionTime + skipSeconds + skipSeconds);
    }
  }

  const onTimeUpdate = (event) => {
    if (typeof onCurrentTime === 'function') onCurrentTime(event?.target || {});
  }

  const userAgentProps = {
    onMouseEnter: () => onMouseEnter(videoRef.current),
    onMouseLeave: () => onMouseLeave(videoRef.current),
    onMouseMove: () => onMouseMove(videoRef.current),
  }

  return (
    <article className={namespace} {...userAgentProps}>
      <video
        ref={videoRef}
        onClick={() => !hiddenControls && onClick(videoRef.current)}
        onTimeUpdate={onTimeUpdate} onEnded={onEnded}
        onDurationChange={onDurationChange}
        {...restEvents}
        {...options}>
        {sources.map((source) => <source key={source.src} {...source} />)}
      </video>
      <Controls isActive={!hiddenControls && isActive} paused={paused} />
    </article>
  )
}
