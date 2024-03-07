import { useState, useRef } from 'react';
import { throttle } from '../../../utils';

export const useActiveUser = (timeActive = 2500) => {
    const [isActive, setIsActive] = useState(true);
    const timeId = useRef();

    const activeTempUser = (time) => {
        setIsActive(true);
        clearTimeout(timeId.current);

        timeId.current = setTimeout(() => {
            setIsActive(false);
        }, time);
    }

    const activeUser = () => {
        setIsActive(true);
        clearTimeout(timeId.current);
    }

    const deactiveUser = () => {
        setIsActive(false);
        clearTimeout(timeId.current);
    }

    // -----------------------------------------
    const onPlay = () => {
        activeTempUser(timeActive);
    }

    const onPause = () => {
        activeUser();
    }

    const onMouseEnter = (event) => {
        const { paused } = event?.currentTarget || {};

        if (!paused) activeTempUser(timeActive);
    };

    const onMouseLeave = (event) => {
        const { paused } = event?.currentTarget || {};

        if (!paused) deactiveUser();
    };

    const onMouseMove = throttle((event) => {
        const { paused } = event?.currentTarget || {};

        if (!paused) activeTempUser(timeActive);
    }, 500);

    const onTouchEnd = (event) => {
        const { paused } = event?.currentTarget || {};

        if (paused) {
            if (isActive) deactiveUser();
            else activeUser();
        } else if (!isActive) activeTempUser(timeActive);
        else deactiveUser();
    };


    const events = {
        onMouseEnter,
        onMouseLeave,
        onMouseMove,
        onTouchEnd,
        onPlay,
        onPause
    }

    return [isActive, events];
}