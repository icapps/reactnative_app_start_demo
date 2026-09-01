import { useEffect, useRef, useState } from 'react';

type SimulatedStartupCheckOptions = {
  isEnabled?: boolean;
  shouldFail?: boolean;
  minMs?: number;
  maxMs?: number;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onStart?: () => void;
};

export function useSimulatedStartupCheck({
  isEnabled = true,
  shouldFail = false,
  minMs = 250,
  maxMs = 2_500,
  onSuccess,
  onError,
  onStart,
}: SimulatedStartupCheckOptions = {}) {
  const [isSettled, setIsSettled] = useState(false);
  const [error, setError] = useState<Error>();
  const [attempt, setAttempt] = useState(0);

  const callbacksRef = useRef({ onError, onStart, onSuccess });
  callbacksRef.current = { onError, onStart, onSuccess };

  useEffect(() => {
    void attempt;

    if (!isEnabled) {
      return;
    }

    setIsSettled(false);
    setError(undefined);

    callbacksRef.current.onStart?.();
    const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;

    const timeoutId = setTimeout(() => {
      if (shouldFail) {
        const startupError = new Error('Simulated startup check failed');
        setError(startupError);
        setIsSettled(true);
        callbacksRef.current.onError?.(startupError);
        return;
      }

      callbacksRef.current.onSuccess?.();
      setIsSettled(true);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [attempt, isEnabled, maxMs, minMs, shouldFail]);

  return {
    error,
    hasError: !!error,
    isSettled,
    retry: () => setAttempt((currentAttempt) => currentAttempt + 1),
  };
}
