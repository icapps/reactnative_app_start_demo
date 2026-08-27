import { useEffect, useRef, useState } from 'react';

type RandomDelayOptions = {
  minMs?: number;
  maxMs?: number;
  onComplete?: () => void;
  onStart?: () => void;
};

export function useRandomDelay({
  minMs = 250,
  maxMs = 2_500,
  onComplete,
  onStart,
}: RandomDelayOptions = {}) {
  const [isComplete, setIsComplete] = useState(false);
  const callbacksRef = useRef({ onComplete, onStart });
  callbacksRef.current = { onComplete, onStart };

  useEffect(() => {
    callbacksRef.current.onStart?.();
    const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
    const timeoutId = setTimeout(() => {
      callbacksRef.current.onComplete?.();
      setIsComplete(true);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [maxMs, minMs]);

  return {
    isComplete,
  };
}
