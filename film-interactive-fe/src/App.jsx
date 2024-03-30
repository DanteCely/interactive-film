
import { Film } from './pages/Film';
import filmScript from '../../film-script.json';
import { SceneManagerProvider } from './contexts/SceneManager';
import clsx from 'clsx';
import { arrayToMap } from './utils';
import { useEffect, useState } from 'react';

const { script, options, prevOptions, delayOptions, skipSeconds } = filmScript;

const _script = arrayToMap(script, 'id');
const _options = arrayToMap(options, 'id')
const _prevOptions = arrayToMap(prevOptions, 'id')

const namespace = 'app';

const App = () => {
  const [isMobile, setIsMobile] = useState(navigator.userAgentData.mobile);
  const classname = clsx(namespace, { mobile: isMobile });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(navigator.userAgentData.mobile);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <main className={classname}>
    <SceneManagerProvider
      isMobile={isMobile}
      delayOptions={delayOptions}
      skipSeconds={skipSeconds}
      script={_script}
      options={_options}
      prevOptions={_prevOptions}>
      <Film />
    </SceneManagerProvider>
  </main>
}

export default App
