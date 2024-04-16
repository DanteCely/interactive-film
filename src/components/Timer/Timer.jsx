/* eslint-disable react/prop-types */
import { useMemo, useEffect } from 'react';
import clsx from 'clsx';

const namespace = 'timer';

export const Timer = ({ total, currentTime, onCountDownEnd }) => {

  const percent = useMemo(() => currentTime ? (currentTime / total) * 100 : 0, [currentTime, total]);

  useEffect(() => {
    if (percent <= 0) onCountDownEnd();
  }, [currentTime, onCountDownEnd, percent, total]);

  const classname = clsx(namespace, { [`${namespace}--hidden`]: !currentTime });

  return (
    <div className={classname} style={{ width: `${percent}%` }}>
      <span className="visually-hidden">{currentTime}</span>
    </div>
  );
}
