/* eslint-disable react/prop-types */
import { Icon } from '../';
import clsx from 'clsx';

const namespace = 'button';

export const Button = (props) => {
  const { text, icon, children, className, ...rest } = props;

  return (
    <button className={clsx(namespace, className)} {...rest}>
      {children ||
        <>
          {icon && <Icon>{icon}</Icon>}
          {text && <span>{text}</span>}
        </>}
    </button>
  )
}
