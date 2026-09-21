import { useState, useEffect } from 'react';

export function useTimer(isActive: boolean, initialSeconds = 0) {
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    const formattedTime = new Date(seconds * 1000).toISOString().substring(14, 19);

    return { seconds, formattedTime, reset: () => setSeconds(0) };
}