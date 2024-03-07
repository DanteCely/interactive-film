import clsx from "clsx";

const namespace = "controls";
const namespaceHidden = `${namespace}--hidden`;

export const Controls = ({isActive}) => {
    const classnames = clsx(namespace, { [namespaceHidden]: !isActive });

    return <section className={classnames}>Controls</section>;
}