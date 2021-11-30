import { useState } from 'react'

interface LoaderResult<T> {
  result: T
  isLoading: boolean
  isLoaded: boolean
  error?: Error
  load: (...args: []) => Promise<void>
}

export const useLoader = <T, A extends any[]>(apiCall: (...args: A) => Promise<T>, defaultValue: T): LoaderResult<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [result, setResult] = useState<T>(defaultValue)
  const [error, setError] = useState<Error>()

  const load = async (...args: A) => {
    setError(undefined)
    setIsLoading(true)
    try {
      const data = await apiCall(...args)
      setResult(data)
      setIsLoaded(true)
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    result,
    isLoaded,
    isLoading,
    error,
    load,
  }
}

export default useLoader
