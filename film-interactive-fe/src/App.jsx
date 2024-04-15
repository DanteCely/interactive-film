import clsx from 'clsx';
import filmScript from '../../film-script.json';
import { Film } from './pages/Film';
import { SceneManagerProvider } from './contexts/SceneManager';
import { useEffect, useState } from 'react';

const namespace = 'app';

const App = () => {
  const [isMobile, setIsMobile] = useState(navigator.userAgentData.mobile);
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
        sceneInit={filmScript}
      >
        <Film />
      </SceneManagerProvider>
    </main>
  );
};

export default App;
