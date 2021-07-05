import { useEffect, useState } from 'react'

function useDebounce(delay = 300, value: any) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      window.clearTimeout(handler)
    }
  }, [value, delay])
  return debouncedValue
}

export default useDebounce