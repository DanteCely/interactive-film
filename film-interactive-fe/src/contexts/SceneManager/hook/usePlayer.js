import { useState, useRef } from 'react';
import { throttle } from '../../../utils';

export const playPause = (target = {}) => {
    const { paused } = target;

    if (paused) target.play();
    else target.pause();
}

const isMobile = navigator?.userAgentData?.mobile;

export const usePlayer = (timeActive = 2500) => {
    const [isActive, setIsActive] = useState(true);
    const [paused, setPaused] = useState(true);
    const timeId = useRef();

    const activeTempUser = (time) => {
        setIsActive(true);
        clearTimeout(timeId.current);
        timeId.current = undefined;

        timeId.current = setTimeout(() => {
            setIsActive(false);
            clearTimeout(timeId.current);
            timeId.current = undefined;
        }, time);
    }

    const activeUser = () => {
        setIsActive(true);
        clearTimeout(timeId.current);
        timeId.current = undefined;
    }

    const deactiveUser = () => {
        setIsActive(false);
        clearTimeout(timeId.current);
        timeId.current = undefined;
    }

    // -----------------------------------------
    const onPlay = () => {
        activeTempUser(timeActive);
        setPaused(false);
    }

    const onPause = () => {
        activeUser();
        setPaused(true);
    }

    const onClick = (event) => {
        if (!isMobile) playPause(event?.currentTarget);
    }

    const onMouseEnter = (event) => {
        const { paused } = event?.currentTarget || {};

        if (!paused && !isMobile) activeTempUser(timeActive);
    };

    const onMouseLeave = (event) => {
        const { paused } = event?.currentTarget || {};

        if (!paused && !isMobile) deactiveUser();
    };

    const onMouseMove = throttle((event) => {
        const { paused } = event?.currentTarget || {};

        if (!paused && !isMobile) activeTempUser(timeActive);
    }, 500);

    const onTouchEnd = (event) => {
        const { paused } = event?.currentTarget || {};

        if (paused) {
            if (isActive) deactiveUser();
            else activeUser();
        } else {
            if (isActive) deactiveUser();
            else activeUser();
        }
    };

    const state = {
        paused,
        isActive
    }

    const events = {
        onMouseEnter,
        onMouseLeave,
        onMouseMove,
        onTouchEnd,
        onPlay,
        onPause,
        onClick
    }

    return [state, events];
}