
import { Scene } from './components';
import filmScript from '../../film-script.json';

const script = filmScript.script;
const scene = script[0];

const namespace = 'app';

const App = () => {

  return <main className={namespace}>
    <Scene defaultOption={scene.default_option} options={scene.options} decisionTime={scene.decision_time} sources={scene.sources} />
  </main>
}

export default App
