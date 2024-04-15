/* eslint-disable react/prop-types */
import { Button, Timer } from '../';
import clsx from 'clsx';
import { useScenes, SET_NEXT_SCENE } from '../../contexts/SceneManager';

const namespace = 'interactive';
const namespaceHidden = `${namespace}--hidden`;

export const Interactive = (props) => {
  const { currentTime, options, defaultOption, total } = props;
  const [state, dispatch] = useScenes();

  const onCountDownEnd = () => {
    if (!state.scene.optionChosen) {
      const option = options[defaultOption];

      document.getElementById(option.id).click();
      dispatch({ type: SET_NEXT_SCENE, payload: option.next });
    }
  };

  const onClick = (event, { next }) => {
    event?.currentTarget.classList.add('button__primary--visited');
    document.querySelector(`.${namespace}`).classList.add(namespaceHidden);
    dispatch({ type: SET_NEXT_SCENE, payload: next });
  };

  return (
    <section className={clsx(namespace, { [namespaceHidden]: currentTime === undefined })}>
      {currentTime !== undefined && (
        <Timer
          total={total}
          currentTime={currentTime}
          onCountDownEnd={onCountDownEnd}
        />
      )}
      <article className={`${namespace}__options`}>
        {options.map((option) => {
          const buttonProps = {
            type: 'primary',
            onClick,
            ...option,
          };
          return (
            <Button
              key={option.id}
              {...buttonProps}
            />
          );
        })}
      </article>
    </section>
  );
};
