/**
 * Providers wrapper for Lottie Studio
 * Combines Apollo Client, MUI Theme, and other providers
 */

'use client'

import { ReactNode } from 'react'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '@/lib/apollo-client'
import { ThemeProvider } from '@/theme/ThemeProvider'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default Providers
