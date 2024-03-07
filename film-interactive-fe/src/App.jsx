
import { Film } from './page/Film';
import filmScript from '../../film-script.json';
import { SceneManagerProvider } from './contexts/SceneManager';
import clsx from 'clsx';


const namespace = 'app';

const App = () => {
  const classname = clsx(namespace, { mobile: navigator.userAgentData.mobile });

  return <main className={classname}>
    <SceneManagerProvider script={filmScript.script}>
      <Film />
    </SceneManagerProvider>
  </main>
}

export default App
