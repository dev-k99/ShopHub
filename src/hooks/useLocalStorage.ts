import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    return storage.get(key, initialValue);
  });

  useEffect(() => {
    storage.set(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}