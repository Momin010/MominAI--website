import { useState, useEffect, useCallback } from 'react';

export const useLocalStorageState = <T,>(key: string, initialValue: T): [T, (value: T) => void, () => void] => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key “${key}”:`, error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            const valueToStore = JSON.stringify(storedValue);
            window.localStorage.setItem(key, valueToStore);
        } catch (error) {
            console.error(`Error setting localStorage key “${key}”:`, error);
        }
    }, [key, storedValue]);

    const clearValue = useCallback(() => {
        try {
            window.localStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (error) {
            console.error(`Error clearing localStorage key “${key}”:`, error);
        }
    }, [key, initialValue]);

    return [storedValue, setStoredValue, clearValue];
};
