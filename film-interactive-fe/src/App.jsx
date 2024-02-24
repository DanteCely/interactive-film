
import video1Src from './assets/videos/video1.mp4';
import { Scene } from './components';
// import video2Src from './assets/videos/video2.mp4';
// import video3Src from './assets/videos/video3.mp4';

// const src = 'https://vjs.zencdn.net/v/oceans.mp4';
const startAt = 5;
const options = [
  {
    "id": "option_1",
    "text": "Option 1",
    "next": "scene_2"
  },
  {
    "id": "option_2",
    "text": "Option 2",
    "next": "scene_3"
  }
];
const sources = [
  {
    src: video1Src,
    type: 'video/mp4'
  }
]

const namespace = 'app';

const App = () => {

  return <main className={namespace}>
    <Scene defaultOption={1} options={options} startAt={startAt} sources={sources} />
  </main>
}

export default App
