import { IS_DEVELOPMENT } from '@/constant';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseCountdownOptions {
    startingSeconds: number;
}

export function useCountdown({startingSeconds}: UseCountdownOptions) {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const onActionRef = useRef<(() => void) | null>(null);

  const startCountdown = useCallback((onAction?: () => void) => {
    setSecondsLeft(startingSeconds);
    if (onAction) {
      onActionRef.current = onAction;
    }
  }, [startingSeconds]);
  
  useEffect(() => {
    if (secondsLeft === null) return;
    if (secondsLeft <= 0) {
        if (IS_DEVELOPMENT) console.info("Seconds left::", secondsLeft);
        
      onActionRef.current?.();
      return;
    }

    const intervalId = setInterval(() => {
      setSecondsLeft((currentSeconds) => currentSeconds ? currentSeconds - 1 : 0);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsLeft]);

  return { secondsLeft, startCountdown };
}
