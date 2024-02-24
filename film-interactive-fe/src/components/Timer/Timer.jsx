/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

const namespace = 'timer';

export const Timer = ({ countDown, onCountdownEnd }) => {
  const [timer, setTimer] = useState(countDown);
  const width = `${(timer / countDown) * 100}%`;

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(prevTimer => prevTimer - 1);
      } else {
        clearInterval(interval);
        if (typeof onCountdownEnd === 'function') {
          onCountdownEnd();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, onCountdownEnd]);

  return (
    <div className={namespace} style={{ width }}>
      <span className="visually-hidden"> about our mobile plans</span>
    </div>
  );
}
