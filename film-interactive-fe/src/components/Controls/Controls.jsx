import clsx from "clsx";
import { Icon, Button } from '../';
import { playPause } from '../../contexts/SceneManager';

const namespace = "controls";
const namespaceHidden = `${namespace}--hidden`;

export const Controls = (props) => {
    const { isActive, paused } = props;

    const classnames = clsx(namespace, { [namespaceHidden]: !isActive });
    const onClick = () => {
        const videoEl = document.querySelector('video');

        playPause(videoEl);
    }

    return <section className={classnames}>

        <Icon onClick={onClick} className={`${namespace}__big-play`}>{paused ? 'play_circle' : 'pause_circle'}</Icon>
    </section>;
};