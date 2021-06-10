import { useEffect, useState } from 'react'

/**
 * @see https://usehooks.com/useMedia/
 */
export default function useMedia<T>(queries: string[] | string, values: T[], defaultValue: T): T
export default function useMedia<T>(queries: string[] | string, values: T[], defaultValue?: undefined): T | undefined
export default function useMedia<T>(queries: string[] | string, values: T[], defaultValue?: T) {
  const mediaQueryLists = [queries].flat().map((q) => window.matchMedia(q))
  const getValue = () => values[mediaQueryLists.findIndex((mql) => mql.matches)] ?? defaultValue
  const [value, setValue] = useState(getValue)

  useEffect(() => {
    const handler = () => setValue(getValue)
    mediaQueryLists.forEach((mql) => mql.addEventListener('change', handler))
    return () => mediaQueryLists.forEach((mql) => mql.removeEventListener('change', handler))
  }, [])
  return value
}
