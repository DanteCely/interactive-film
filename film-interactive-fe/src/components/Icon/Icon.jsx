/* eslint-disable react/prop-types */
export const Icon = (props) => {
  const { name, children } = props;
  return (
    <span className="material-symbols-outlined">
      {name || children}
    </span>
  )
}
