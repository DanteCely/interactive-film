
/* eslint-disable react/prop-types */

import { useEffect, useRef } from "react";
import { usePlayer } from '../../contexts/SceneManager';
import { Controls } from '../';

const options = {
  controls: false,
  playsInline: false,
  autoPlay: false,
  muted: false,
  loop: false,
  preload: 'auto',
}


export const Player = (props) => {
  const { sources = [], onCurrentTime, onEnded } = props;
  const videoRef = useRef();
  const [{paused, isActive}, events] = usePlayer();

  useEffect(() => {
      videoRef.current?.load();
      videoRef.current?.play();
  }, [sources]);

  const onTimeUpdate = (event) => {
    if (typeof onCurrentTime === 'function') onCurrentTime(event?.target || {});
  }

  return (
    <>
      <video ref={videoRef} onTimeUpdate={onTimeUpdate} onEnded={onEnded} {...events} {...options}>
        {sources.map((source) => <source key={source.src} {...source} />)}
      </video>
      <Controls isActive={isActive} paused={paused} />
    </>
  )
}
