/**
 * DocsContext - Centralized state for documentation data
 * Lazy loaded to reduce initial bundle size
 */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react"
import type { ExpanseEduDocs } from "../types/docs"

interface DocsContextValue {
  docs: ExpanseEduDocs | null
  loading: boolean
  error: Error | null
}

const DocsContext = createContext<DocsContextValue | null>(null)

export function DocsProvider({ children }: { children: ReactNode }) {
  const [docs, setDocs] = useState<ExpanseEduDocs | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Lazy load docs data
    import("../data/docs")
      .then((module) => {
        setDocs(module.expanseEduDocs)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [])

  const value: DocsContextValue = useMemo(
    () => ({
      docs,
      loading,
      error,
    }),
    [docs, loading, error],
  )

  return <DocsContext.Provider value={value}>{children}</DocsContext.Provider>
}

export function useDocsContext() {
  const context = useContext(DocsContext)
  if (!context) {
    throw new Error("useDocsContext must be used within DocsProvider")
  }
  return context
}

/**
 * Hook for accessing docs data
 */
export function useDocs() {
  return useDocsContext()
}
