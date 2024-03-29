/* eslint-disable react/prop-types */
import { Button, Timer } from "../";
import clsx from 'clsx';
import { useScene } from '../../contexts/SceneManager';
import {useState } from "react";

const namespace = 'interactive';
const namespaceHidden = `${namespace}--hidden`;

export const Interactive = (props) => {
  const { currentTime, options, defaultOption, total } = props;
  const { onChosenNextScene } = useScene();
  const [hasChosen, setHasChosen] = useState(false);

  const onCountDownEnd = () => {
    if (!hasChosen) {
      const option = options[defaultOption];

      document.getElementById(option.id).click();
      onChosenNextScene(option.next);
    }
  }

  const onClick = (event, { next }) => {
    event?.currentTarget.classList.add('button__primary--visited');
    document.querySelector(`.${namespace}`).classList.add(namespaceHidden);
    setHasChosen(true);
    onChosenNextScene(next);
  }

  return (
    <section className={clsx(namespace, { [namespaceHidden]: currentTime === undefined })}>
      {currentTime !== undefined && <Timer total={total} currentTime={currentTime} onCountDownEnd={onCountDownEnd} />}
      <article className={`${namespace}__options`}>
        {options.map((option) => {
          const buttonProps = {
            type: 'primary',
            onClick,
            ...option
          };
          return <Button key={option.id} {...buttonProps} />
        })}
      </article>
    </section>
  );
}
