/* eslint-disable react/prop-types */
import clsx from "clsx";

const namespace = "material-symbols-outlined";

export const Icon = (props) => {
  const { name, className, children, onClick, ...rest } = props;

  return (
    <span className={clsx(namespace, className)} onClick={onClick} {...rest}>
      {name || children}
    </span>
  )
}
