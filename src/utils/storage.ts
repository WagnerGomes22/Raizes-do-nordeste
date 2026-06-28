export type StorageLike = {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
  removeItem: (key: string) => void
}

export function readJsonFromStorage<T>(storage: StorageLike, key: string, fallback: T): T {
  try {
    const raw = storage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function writeJsonToStorage<T>(storage: StorageLike, key: string, value: T) {
  try {
    storage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function removeFromStorage(storage: StorageLike, key: string) {
  try {
    storage.removeItem(key)
    return true
  } catch {
    return false
  }
}

export function createMemoryStorage(): StorageLike & { snapshot: () => Record<string, string> } {
  const map = new Map<string, string>()

  return {
    getItem: (key) => (map.has(key) ? (map.get(key) as string) : null),
    setItem: (key, value) => {
      map.set(key, value)
    },
    removeItem: (key) => {
      map.delete(key)
    },
    snapshot: () => Object.fromEntries(map.entries()),
  }
}

