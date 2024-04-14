import clsx from 'clsx';
import filmScript from '../../film-script.json';
import { Film } from './pages/Film';
import { SceneManagerProvider } from './contexts/SceneManager';
import { arrayToMap } from './utils';
import { useEffect, useState } from 'react';

const { script, options, prevOptions, delayOptions, skipSeconds } = filmScript;

const _script = arrayToMap(script, 'id');
const _options = arrayToMap(options, 'id');
const _prevOptions = arrayToMap(prevOptions, 'id');

const sceneManagerProps = {
  delayOptions: delayOptions,
  options: _options,
  prevOptions: _prevOptions,
  script: _script,
  skipSeconds: skipSeconds,
};

const namespace = 'app';

const App = () => {
  const [isMobile, setIsMobile] = useState();
  const classname = clsx(namespace, { mobile: isMobile });

  useEffect(() => {
    const handleResize = () => setIsMobile(navigator.userAgentData.mobile);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className={classname}>
      <SceneManagerProvider
        isMobile={isMobile}
        {...sceneManagerProps}
      >
        <Film />
      </SceneManagerProvider>
    </main>
  );
};

export default App;
