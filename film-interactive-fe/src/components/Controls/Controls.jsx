import clsx from "clsx";
import { Icon, Button } from '../';
import { playPause, useScene } from '../../contexts/SceneManager';

const namespace = "controls";
const namespaceHidden = `${namespace}--hidden`;

export const Controls = (props) => {
    const { isActive, paused } = props;
    const { isMobile } = useScene();

    const classnames = clsx(namespace, { [namespaceHidden]: !isActive });
    const onClick = () => {
        const videoEl = document.querySelector('video');

        playPause(videoEl);
    }

    return <section className={classnames}>
        {/* TODO: Convert in button when is mobile */}
        <Icon onClick={onClick} className={`${namespace}__big-play`}>{paused ? 'play_circle' : 'pause_circle'}</Icon>
        {/* TODO: Use as a button */}
        <Icon onClick={onClick} className={`${namespace}__return-prev-scene`}>undo</Icon>
        <Icon onClick={onClick} className={`${namespace}__forward`}>forward_10</Icon>
        <Icon onClick={onClick} className={`${namespace}__replay`}>replay_10</Icon>
    </section>;
};