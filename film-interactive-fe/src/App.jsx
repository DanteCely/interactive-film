
import { Player, Interactive } from './components'
import { useState } from 'react';
import video1Src from './assets/videos/video1.mp4';
// import video2Src from './assets/videos/video2.mp4';
// import video3Src from './assets/videos/video3.mp4';

// const src = 'https://vjs.zencdn.net/v/oceans.mp4';
const startAt = 5;
const namespace = 'app';

const App = () => {
  const [ready, setReady] = useState();
  const [once, setOnce] = useState(false);



  const onCurrentTime = ({ currentTime, duration }) => {
    const restTime = duration - currentTime;
    if (!once && restTime < startAt) {
      setReady(Math.floor(restTime));
      setOnce(true);
    }
  }

  return <main className={namespace}>
    <Player src={video1Src} onCurrentTime={onCurrentTime}></Player>
    {ready && <Interactive countDown={ready} />}
  </main>
}

export default App
