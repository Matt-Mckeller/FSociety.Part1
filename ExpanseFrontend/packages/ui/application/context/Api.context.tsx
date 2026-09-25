"use client"
import React, { useContext, useEffect, useMemo, useState } from "react"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  ApolloLink,
  from,
  HttpLink,
  useMutation,
} from "@apollo/client"

import { onError } from "@apollo/client/link/error"
import { sendGAEvent } from "../components"
import { usePathname, useRouter } from "next/navigation"

const authHeaderLink = new ApolloLink((operation, forward) => {
  // operation.setContext({ start: new Date() })
  const authToken = localStorage.getItem("auth-token") || ""
  const bearerString =
    authToken && authToken.length > 0 ? `Bearer ${authToken}` : ""
  operation.setContext(({ headers }: any) => ({
    headers: {
      authorization: bearerString,
      ...headers,
    },
  }))
  if (forward) {
    return forward(operation)
  }
  return null
})

const eduAuthHeaderLink = new ApolloLink((operation, forward) => {
  // operation.setContext({ start: new Date() })
  const authToken = localStorage.getItem("expanseAccessToken") || ""
  const bearerString =
    authToken && authToken.length > 0 ? `Bearer ${authToken}` : ""
  operation.setContext(({ headers }: any) => ({
    headers: {
      authorization: bearerString,
      ...headers,
    },
  }))
  if (forward) {
    return forward(operation)
  }
  return null
})

const googleAnalyticsLink = new ApolloLink((operation, forward) => {
  // Current system for utilizing google analytics without
  // having to rewrite setup or do multiple calls from every component
  if (operation.operationName === "registerAnalyticsEvent") {
    const eventName = operation.variables.event
    const eventVariables = { ...operation.variables }
    delete eventVariables["event"]
    sendGAEvent(eventName, eventVariables)
  }
  if (forward) {
    return forward(operation)
  }
  return null
})

const getHttpLink = (baseGraphQLApiUrl: string) =>
  new HttpLink({
    uri: baseGraphQLApiUrl,
  })

const errorLink = onError(({ graphQLErrors, networkError }) => {
  // No logging to database is done here, that should be handled on backend before returning
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    )
  }

  // Network errors are not saved
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

export const getApolloClientEdu = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([
      eduAuthHeaderLink,
      errorLink,
      getHttpLink(process.env.NEXT_PUBLIC_BACKEND_EDU_API_URL || ""),
    ]),
  })
}
export const getApolloClient = ({
  baseGraphQLApiUrl,
  extraLinkMiddleware = [],
}: {
  baseGraphQLApiUrl: string
  extraLinkMiddleware: ApolloLink[]
}) =>
  new ApolloClient({
    cache: new InMemoryCache(),
    link: from([
      authHeaderLink,
      ...extraLinkMiddleware,
      errorLink,
      getHttpLink(baseGraphQLApiUrl),
    ]),

    // defaultOptions: {
    //   watchQuery: {
    //     fetchPolicy: 'no-cache',
    //     errorPolicy: 'ignore',
    //   },
    //   query: {
    //     fetchPolicy: 'no-cache',
    //     errorPolicy: 'all',
    //   },
    //   mutate: {
    //     errorPolicy: 'all',
    //   },
    // },
  })

export type ApiContextType = {
  baseGraphQLApiUrl: string
}
export type ApiProviderProps = {
  baseGraphQLApiUrl: string
  enableGoogleAnalytics: boolean
  children: React.ReactNode
}

export const ApiContext = React.createContext<ApiContextType>(null)

export const ApiProvider = ({
  baseGraphQLApiUrl,
  children,
}: ApiProviderProps) => {
  // Logic may change in the future

  const pathname = usePathname()
  const router = useRouter()

  // todo may want to move this to authsession context
  const handleQueryString = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const expanseAccessToken = urlParams.get("expanseAccessToken")
    if (expanseAccessToken) {
      localStorage.setItem("expanseAccessToken", expanseAccessToken)
      // localStorage.setItem("auth-token", expanseAccessToken)
      urlParams.delete("expanseAccessToken")
      console.log("Received access token", { expanseAccessToken })
      const newUrl = `${window.location.pathname}?${urlParams.toString()}`
      router.replace(newUrl, { scroll: false })
    }
  }

  useEffect(() => {
    handleQueryString()
  }, [pathname])

  const value: ApiContextType = useMemo(
    () => ({
      // Api
      baseGraphQLApiUrl,
    }),
    [baseGraphQLApiUrl],
  )
  const client = useMemo(
    () =>
      getApolloClient({
        baseGraphQLApiUrl,
        extraLinkMiddleware: [googleAnalyticsLink],
      }),
    [baseGraphQLApiUrl],
  )

  return (
    <ApolloProvider client={client}>
      <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
    </ApolloProvider>
  )
}
