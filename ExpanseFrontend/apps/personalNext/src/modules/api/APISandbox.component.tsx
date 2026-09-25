"use client"
import { ApolloSandbox } from "@apollo/sandbox/react"
import { ApiContext, useWindowDimensions } from "expanse.ui/application"
import React, { useContext } from "react"
import SandboxCSS from "./sandbox.module.scss"
import { Box, useMediaQuery, useTheme } from "@mui/system"
import { Typography } from "@mui/material"
export const APISandbox = () => {
  const { baseGraphQLApiUrl } = useContext(ApiContext)
  const theme = useTheme()
  const isUsableWidth = useMediaQuery(theme.breakpoints.up("laptop"))
  const initialState = {
    document: `# GREETINGS and INSTRUCTIONS!
# Scroll down to see an example query ( Read ) and mutation ( Write ) in GraphQL
# This is the main window for running operations. On the right you will see your responses. On the left you can explore the public API.
# This is a work in progress, if you want to explore the documentation look at the mutations rather than queries.
# To run a query place your cursor inside of either the query or mutation listed below and hit run on the top right. You will see your response on the right hand side.
# For more details on the API Explorer tool see: https://www.apollographql.com/docs/graphos/platform/explorer

query WelcomeQuery {
  welcome
}

mutation SignIn ($input: SignInInput!) {
  signIn(input: $input) {
    jwt
    success
  }
}
`,
    variables: {
      input: {
        email: "sample@expanseservices.com",
        password: "codeGrowLive%38",
      },
    },
  }
  if (isUsableWidth) {
    return (
      <Box
        flexGrow="1"
        display="flex"
        flexDirection="column"
        // @ts-expect-error mui shadows are unknown
        boxShadow={(theme: Theme) => theme.shadows[1]}
        borderRadius="10px"
      >
        <ApolloSandbox
          initialEndpoint="https://www.expanseservices.com/api"
          className={SandboxCSS.ApiSandbox}
          initialState={initialState}
        />
      </Box>
    )
  }
  return (
    <Typography component="p" color="error">
      Please use a laptop or desktop screen to experiment with the api sandbox
      feature.
    </Typography>
  )
}
