import { useState, useEffect, useRef } from 'react';

/**
 * A hook that returns a throttled version of the provided value
 * @param value The value to throttle
 * @param delay The delay in milliseconds
 * @returns The throttled value
 */
export function useThrottle<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    const timeElapsed = now - lastExecuted.current;
    
    if (timeElapsed >= delay) {
      lastExecuted.current = now;
      setThrottledValue(value);
    } else {
      const timerId = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, delay - timeElapsed);
      
      return () => clearTimeout(timerId);
    }
  }, [value, delay]);

  return throttledValue;
}
