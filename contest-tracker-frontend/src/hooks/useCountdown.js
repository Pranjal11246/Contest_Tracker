// src/hooks/useCountdown.js
import { useState, useEffect, useRef } from 'react';

/**
 * Returns { days, hours, minutes, seconds, isExpired }
 * given a target ISO date string or Date object.
 */
export function useCountdown(target) {
  const getTimeLeft = () => {
    const diff = new Date(target).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return { days, hours, minutes, seconds, isExpired: false };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const ref = useRef(null);

  useEffect(() => {
    ref.current = setInterval(() => {
      const next = getTimeLeft();
      setTimeLeft(next);
      if (next.isExpired) clearInterval(ref.current);
    }, 1000);
    return () => clearInterval(ref.current);
  }, [target]);

  return timeLeft;
}
