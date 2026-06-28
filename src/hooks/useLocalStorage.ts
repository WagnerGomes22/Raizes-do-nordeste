import { useCallback, useEffect, useRef, useState } from 'react'

import {
  readJsonFromStorage,
  removeFromStorage,
  writeJsonToStorage,
  type StorageLike,
} from '@/utils/storage'

type SetValue<T> = (value: T | ((prev: T) => T)) => void

export function useLocalStorage<T>(key: string, initialValue: T) {
  const initialValueRef = useRef(initialValue)

  const getStorage = useCallback((): StorageLike | null => {
    if (typeof window === 'undefined') return null
    return window.localStorage
  }, [])

  const readValue = useCallback((): T => {
    const storage = getStorage()
    const fallback = initialValueRef.current
    if (!storage) return fallback
    return readJsonFromStorage(storage, key, fallback)
  }, [getStorage, key])

  const [storedValue, setStoredValue] = useState<T>(() => readValue())

  const setValue: SetValue<T> = useCallback(
    (value) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value

        const storage = getStorage()
        if (storage) writeJsonToStorage(storage, key, next)

        return next
      })
    },
    [getStorage, key],
  )

  const remove = useCallback(() => {
    const storage = getStorage()
    if (storage) removeFromStorage(storage, key)
    setStoredValue(initialValueRef.current)
  }, [getStorage, key])

  useEffect(() => {
    initialValueRef.current = initialValue
  }, [initialValue])

  useEffect(() => {
    setStoredValue(readValue())
  }, [readValue])

  return { value: storedValue, setValue, remove }
}

