/* eslint-disable react/prop-types */
import { Button, Timer } from "../";

const namespace = 'interactive';

export const Interactive = (props) => {
  const { countDown } = props;

  return (
    <section className={namespace}>
      <Timer countDown={countDown} />
      <article className={`${namespace}__options`}>
        <Button>Consectetur adipisicing elit.</Button>
        <Button>Inventore veritatis exercitationem </Button>
      </article>
    </section>
  );
}
