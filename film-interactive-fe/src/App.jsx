
import { Player, Interactive } from './components'

const src = 'https://vjs.zencdn.net/v/oceans.mp4'

const App = () => {
  return <>
    <Player src={src}></Player>
    <Interactive></Interactive>
  </>
}

export default App
