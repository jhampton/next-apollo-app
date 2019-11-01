import React from 'react'
import Head from 'next/head'
import App from 'next/app'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-unfetch'

let apolloClient = null
const server = typeof window === 'undefined'

class MyApp extends App {
  static async getInitialProps (appCtx) {
    const { Component, AppTree, ctx } = appCtx
    const apollo = (ctx.apollo = initApolloClient())
    let pageProps = {}

    // Get component's getInitialProps if any
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    // Return if finished
    if (ctx.res && (ctx.res.headersSent || ctx.res.finished)) {
      return {}
    }

    // Run all GraphQL queries
    try {
      const { getDataFromTree } = await import('@apollo/react-ssr')

      await getDataFromTree(
        <AppTree
          {...pageProps}
          apollo={apollo}
        />
      )
    } catch (error) {
      // Prevent Apollo Client GraphQL errors from crashing SSR
      console.error('Error while running `getDataFromTree`', error)
    }

    // getDataFromTree does not call componentWillUnmount head side effect therefore need to be cleared manually
    if (server) {
      Head.rewind()
    }

    // Extract query data from the Apollo store
    const apolloState = apollo.cache.extract()

    // Prevent initApollo twice on server
    apollo.toJSON = () => null

    return {
      pageProps,
      apollo,
      apolloState
    }
  }

  constructor(props) {
    super(props)

    this.apollo = props.apollo || initApolloClient(props.apolloState)
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <ApolloProvider client={this.apollo}>
        <Component {...pageProps} />
      </ApolloProvider>
    )
  }
}

function initApolloClient (initialState) {
  // Make sure to create a new client for every server-side request so that data isn't shared between connections
  if (server) {
    return createApolloClient(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState)
  }

  return apolloClient
}

function createApolloClient (initialState = {}) {
  return new ApolloClient({
    ssrMode: server,
    link: new HttpLink({
      uri: 'https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn',
      credentials: 'same-origin',
      fetch
    }),
    cache: new InMemoryCache().restore(initialState)
  })
}

export default MyApp
