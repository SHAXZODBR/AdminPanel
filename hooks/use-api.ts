"use client"

import { useState, useEffect, useCallback } from "react"

interface UseApiOptions<T> {
  initialData?: T
  dependencies?: any[]
  onSuccess?: (data: T) => void
  onError?: (error: string) => void
}

export function useApi<T>(
  apiCall: () => Promise<{ data?: T; error?: string; success: boolean }>,
  options: UseApiOptions<T> = {},
) {
  const [data, setData] = useState<T | undefined>(options.initialData)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isUsingMockData, setIsUsingMockData] = useState(false)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await apiCall()

      if (response.success && response.data) {
        setData(response.data)
        setIsUsingMockData(false)
        options.onSuccess?.(response.data)
      } else {
        setError(response.error || "An error occurred")
        options.onError?.(response.error || "An error occurred")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      options.onError?.(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [apiCall, options])

  useEffect(() => {
    fetchData()
  }, [...(options.dependencies || [])])

  return {
    data,
    error,
    isLoading,
    isUsingMockData,
    refetch: fetchData,
  }
}
