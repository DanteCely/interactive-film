/* eslint-disable react/prop-types */
import { Icon } from '../';

export const Button = (props) => {
  const { text, icon, children, ...rest } = props;

  return (
    <button {...rest}>
      {children ||
        <>
          {icon && <Icon>{icon}</Icon>}
          {text && <span>{text}</span>}
        </>}
    </button>
  )
}
