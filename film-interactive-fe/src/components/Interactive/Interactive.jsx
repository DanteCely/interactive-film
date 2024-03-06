/* eslint-disable react/prop-types */
import { Button, Timer } from "../";
import clsx from 'clsx';

const namespace = 'interactive';

export const Interactive = (props) => {
  const { currentTime, options, defaultOption, total, onChosenNextScene } = props;
  const onCountDownEnd = () => {
    const chosenOption = options[defaultOption];

    document.getElementById(chosenOption.id).click();
    // Cargar la siguiente escena por optimización
    onChosenNextScene(chosenOption.next);
  }

  const handleClick = (event) => {
    event?.currentTarget.classList.add('button--visited');
    document.querySelector('.interactive').classList.add('interactive--hidden');
  }

  console.log({ currentTime, ssome: currentTime === undefined })

  return (
    <section className={clsx(namespace, { ['interactive--hidden']: currentTime === undefined })}>
      {currentTime !== undefined && <Timer total={total} currentTime={currentTime} onCountDownEnd={onCountDownEnd} />}
      <article className={`${namespace}__options`}>
        {options.map((option) => {
          const buttonProps = {
            id: option.id,
            text: option.text,
            onClick: handleClick,
          };

          return <Button key={option.id} {...buttonProps} />
        })}
      </article>
    </section>
  );
}
