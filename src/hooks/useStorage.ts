import * as React from 'react';

type StorageType = 'local' | 'session';

interface UseStorageOptions<T> {
    initialValue: T;
    key: string;
    storage?: StorageType;
}

export const useStorage = <T>({ initialValue, key, storage = 'local' }: UseStorageOptions<T>): [T, (value: T | ((val: T) => T)) => void] => {
    const storageAvailable = typeof window !== 'undefined';

    const [storedValue, setStoredValue] = React.useState<T>(() => {
        if (!storageAvailable) return initialValue;
        try {
            const item = storage === 'local' ? window.localStorage.getItem(key) : window.sessionStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Failed to parse storage item for key "${key}":`, error);
            return initialValue;
        }
    });

    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (storageAvailable) {
                const serializedValue = JSON.stringify(valueToStore);
                if (storage === 'local') {
                    window.localStorage.setItem(key, serializedValue);
                } else {
                    window.sessionStorage.setItem(key, serializedValue);
                }
            }
        } catch (error) {
            console.error(`Failed to serialize the value for key "${key}":`, error);
        }
    };

    React.useEffect(() => {
        if (!storageAvailable) return;

        const handleStorageChange = (event: StorageEvent) => {
            const area = storage === 'local' ? window.localStorage : window.sessionStorage;
            if (event.storageArea === area && event.key === key) {
                const newValue = event.newValue ? JSON.parse(event.newValue) : undefined;
                setStoredValue(newValue);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [key, storage, storageAvailable]);

    return [storedValue, setValue];
};

export const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] => {
    return useStorage<T>({initialValue, key, storage:'local'});
};

export const useSessionStorage = <T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] => {
    return useStorage<T>({ initialValue, key, storage: 'session' });
};

export const getLocalStorageValue = <T>(key: string, initialValue: T): T => {
    if (typeof window === 'undefined') return initialValue;
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    } catch (error) {
        console.error(`Failed to parse localStorage item for key "${key}":`, error);
        return initialValue;
    }
};
