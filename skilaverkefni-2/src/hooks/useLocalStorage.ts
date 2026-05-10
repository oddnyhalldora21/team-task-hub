import { useState, useEffect } from 'react'
import { z } from 'zod'

export function useLocalStorage<T>(
  key: string,
  schema: z.ZodType<T>,
  fallback: T
): [T, (value: T) => void] {
  const [data, setData] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key)
      if (!stored) return fallback
      const parsed = schema.safeParse(JSON.parse(stored))
      return parsed.success ? parsed.data : fallback
    } catch {
      return fallback
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data))
  }, [key, data])

  return [data, setData]
}