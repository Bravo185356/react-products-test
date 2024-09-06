import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay: number) => {
  const [debounceValue, setDebounceValue] = useState('');
  const [timerId, setTimerId] = useState<number | null>(null);

  useEffect(() => {
    if (timerId) {
      clearTimeout(timerId);
    }
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    setTimerId(timer);
  }, [value, delay]);

  return { debounceValue };
};
