/* eslint-disable react/prop-types */
import { Icon } from '../';
import clsx from 'clsx';

const namespace = 'button';

export const Button = (props) => {
  const { text, icon, children, className, type, onClick, ...rest } = props;

  const handleClick = (event) => {
    onClick(event, rest);
  }

  const classnames = clsx(namespace, className, { [`${namespace}__${type}`]: type });

  return (
    <button className={classnames} onClick={handleClick} {...rest}>
      {children ||
        <>
          {icon && <Icon>{icon}</Icon>}
          {text && <span>{text}</span>}
        </>}
    </button>
  )
}
