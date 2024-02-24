
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
  const { src, onCurrentTime } = props;

  const onTimeUpdate = (event) => {
    if (typeof onCurrentTime === 'function') onCurrentTime(event?.target || {});
  }

  return (
    <>
      <video src={src} {...options} onTimeUpdate={onTimeUpdate}></video>
    </>
  )
}
