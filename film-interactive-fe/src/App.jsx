
import { Film } from './page/Film';
import filmScript from '../../film-script.json';
import { SceneManagerProvider } from './contexts/SceneManager';


const namespace = 'app';

const App = () => {
  return <main className={namespace}>
    <SceneManagerProvider script={filmScript.script}>
      <Film />
    </SceneManagerProvider>
  </main>
}

export default App
