
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
  const { src } = props;

  return (
    <>
      <video src={src} {...options}></video>
    </>
  )
}
