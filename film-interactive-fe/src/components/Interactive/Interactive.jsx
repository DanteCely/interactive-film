/* eslint-disable react/prop-types */
import { Button, Timer } from "../";
import clsx from 'clsx';
import { useScene } from '../../contexts/SceneManager';
import { useState } from "react";

const namespace = 'interactive';

export const Interactive = (props) => {
  const { currentTime, options, defaultOption, total } = props;
  const { onChosenNextScene } = useScene();
  const [hasChosen, setHasChosen] = useState(false);

  const onCountDownEnd = () => {
    if (!hasChosen) {
      const option = options[defaultOption];

      document.getElementById(chosenOption.id).click();
      onChosenNextScene(option.next);
    }
  }

  const onClick = (next, event) => {
    event?.currentTarget.classList.add('button--visited');
    document.querySelector('.interactive').classList.add('interactive--hidden');
    setHasChosen(true);
    onChosenNextScene(next);
  }
 
  return (
    <section className={clsx(namespace, { ['interactive--hidden']: currentTime === undefined })}>
      {currentTime !== undefined && <Timer total={total} currentTime={currentTime} onCountDownEnd={onCountDownEnd} />}
      <article className={`${namespace}__options`}>
        {options.map((option) => {
          return <Button key={option.id} onClick={onClick} {...option} />
        })}
      </article>
    </section>
  );
}
