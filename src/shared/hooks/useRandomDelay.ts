import { useEffect, useState } from 'react';

type RandomDelayOptions = {
  minMs?: number;
  maxMs?: number;
};

export function useRandomDelay({
  minMs = 250,
  maxMs = 2_500,
}: RandomDelayOptions = {}) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
    const timeoutId = setTimeout(() => setIsReady(true), delay);

    return () => clearTimeout(timeoutId);
  }, [maxMs, minMs]);

  return { isReady };
}
