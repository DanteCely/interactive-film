import clsx from "clsx";
import { Icon, Button } from '../';
import { playPause, skip, useScene } from '../../contexts/SceneManager';
import { SKIP_SEC } from '../../constants'

const namespace = "controls";
const namespaceHidden = `${namespace}--hidden`;

export const Controls = (props) => {
    const { isActive, paused } = props;
    const { isMobile } = useScene();

    const classnames = clsx(namespace, { [namespaceHidden]: !isActive });
    const onPlayPause = () => {
        const videoEl = document.querySelector('video');

        playPause(videoEl);
    }
    const onSkip = (seconds) => {
        const videoEl = document.querySelector('video');
        skip(seconds, videoEl);
    }

    return <section className={classnames}>
        <Icon onClick={onPlayPause} className={`${namespace}__big-play`}>{paused ? 'play_circle' : 'pause_circle'}</Icon>
        <Icon onClick={() => onSkip(SKIP_SEC)} className={`${namespace}__forward`}>forward_10</Icon>
        <Icon onClick={() => onSkip(-SKIP_SEC)} className={`${namespace}__backward`}>replay_10</Icon>
    </section>;
};