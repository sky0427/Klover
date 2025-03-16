import {useCallback, useEffect, useMemo, useState} from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const updateDebouncedValue = useCallback(
    (newValue: T) => {
      setDebouncedValue(newValue);
    },
    [setDebouncedValue],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      updateDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay, updateDebouncedValue]);

  return useMemo(() => debouncedValue, [debouncedValue]);
}

export default useDebounce;
