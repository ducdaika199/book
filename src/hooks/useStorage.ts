import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import useEventListener from './useEventListener';

declare global {
  interface WindowEventMap {
    'local-storage': CustomEvent;
    'session-storage': CustomEvent;
  }
}

type SetValue<T> = Dispatch<SetStateAction<T>>;

type StorageType = 'local' | 'session';

function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '');
  } catch {
    console.log('parsing error on', { value });
    return undefined;
  }
}

function useStorage<T>(
  key: string,
  initialValue: T,
  type?: StorageType,
): [T, SetValue<T>] {
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item =
        type === 'session'
          ? window.sessionStorage.getItem(key)
          : window.localStorage.getItem(key);
      console.log('item', item);
      return item ? (parseJSON(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading Storage key “${key}”:`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue: SetValue<T> = useCallback(
    value => {
      if (typeof window === 'undefined') {
        console.warn(
          `Tried setting Storage key “${key}” even though environment is not a client`,
        );
      }

      try {
        // Allow value to be a function so we have the same API as useState
        const newValue = value instanceof Function ? value(storedValue) : value;

        type === 'session'
          ? window.sessionStorage.setItem(key, JSON.stringify(newValue))
          : window.localStorage.setItem(key, JSON.stringify(newValue));

        setStoredValue(newValue);

        // We dispatch a custom event so every useLocalStorage hook are notified
        window.dispatchEvent(
          new Event(type === 'session' ? 'session-storage' : 'local-storage'),
        );
      } catch (error) {
        console.warn(`Error setting Storage key “${key}”:`, error);
      }
    },
    [storedValue],
  );

  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
        return;
      }
      setStoredValue(readValue());
    },
    [key, readValue],
  );

  // this only works for other documents, not the current one
  useEventListener('storage', handleStorageChange);

  // this is a custom event, triggered in writeValueToLocalStorage
  useEventListener(
    type === 'session' ? 'session-storage' : 'local-storage',
    handleStorageChange,
  );

  return [storedValue, setValue];
}

export const useGetLocalStorage = (key: string) => {
  const [value] = useStorage(key, '');

  return value;
};

export const useSetLocalStorage = (key: string) => {
  const [, setValue] = useStorage(key, '');

  return setValue;
};

export const useGetSessionStorage = (key: string) => {
  const [value] = useStorage(key, '', 'session');

  return value;
};

export const useSetSessionStorage = (key: string) => {
  const [, setValue] = useStorage(key, '', 'session');

  return setValue;
};

export default useStorage;
