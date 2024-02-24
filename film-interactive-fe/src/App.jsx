
import { Player, Interactive } from './components'

import video1Src from './assets/videos/video1.mp4';
// import video2Src from './assets/videos/video2.mp4';
// import video3Src from './assets/videos/video3.mp4';

// const src = 'https://vjs.zencdn.net/v/oceans.mp4';

const App = () => {
  return <>
    <Player src={video1Src}></Player>
    <Interactive></Interactive>
  </>
}

export default App
