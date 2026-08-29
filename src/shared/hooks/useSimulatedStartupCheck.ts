import { useEffect, useRef, useState } from 'react';

type SimulatedStartupCheckOptions = {
  isEnabled?: boolean;
  minMs?: number;
  maxMs?: number;
  onComplete?: () => void;
  onStart?: () => void;
};

export function useSimulatedStartupCheck({
  isEnabled = true,
  minMs = 250,
  maxMs = 2_500,
  onComplete,
  onStart,
}: SimulatedStartupCheckOptions = {}) {
  const [isComplete, setIsComplete] = useState(false);
  const callbacksRef = useRef({ onComplete, onStart });
  callbacksRef.current = { onComplete, onStart };

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    callbacksRef.current.onStart?.();
    const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
    const timeoutId = setTimeout(() => {
      callbacksRef.current.onComplete?.();
      setIsComplete(true);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isEnabled, maxMs, minMs]);

  return {
    isComplete,
  };
}
