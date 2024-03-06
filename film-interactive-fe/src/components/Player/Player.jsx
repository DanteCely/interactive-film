
/* eslint-disable react/prop-types */

const options = {
  controls: true,
  playsInline: false,
  autoPlay: false,
  muted: false,
  loop: false,
  preload: 'auto',
}


export const Player = (props) => {
  const { sources, onCurrentTime, onEnded } = props;

  const onTimeUpdate = (event) => {
    if (typeof onCurrentTime === 'function') onCurrentTime(event?.target || {});
  }

  return (
    <video onTimeUpdate={onTimeUpdate} onEnded={onEnded} {...options}>
      {sources.map((source) => {
        return <source key={source.src} {...source} />
      })}
    </video>
  )
}
