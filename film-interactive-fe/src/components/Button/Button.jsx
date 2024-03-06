/* eslint-disable react/prop-types */
import { Icon } from '../';
import clsx from 'clsx';

const namespace = 'button';

export const Button = (props) => {
  const { text, icon, children, className, onClick, next, ...rest } = props;

  const handleClick = (event) => {
    onClick(next, event);
  }

  return (
    <button className={clsx(namespace, className)} onClick={handleClick} {...rest}>
      {children ||
        <>
          {icon && <Icon>{icon}</Icon>}
          {text && <span>{text}</span>}
        </>}
    </button>
  )
}
