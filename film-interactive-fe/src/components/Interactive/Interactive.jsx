/* eslint-disable react/prop-types */
import { Button, Timer } from "../";

const namespace = 'interactive';

export const Interactive = (props) => {
  const { countDown, options, defaultOption } = props;
  const onCountdownEnd = () => {
    document.getElementById(options[defaultOption].id).click();
  }

  return (
    <section className={namespace}>
      <Timer countDown={countDown} onCountdownEnd={onCountdownEnd} />
      <article className={`${namespace}__options`}>
        {options.map((option) => <Button key={option.id} id={option.id} text={option.text} />)}
      </article>
    </section>
  );
}
