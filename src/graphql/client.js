import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

const apolloState = window.__APOLLO_STATE

// Dereference SSR state
delete window.__APOLLO_STATE__

const client = new ApolloClient({
    cache: new InMemoryCache().restore(apolloState),
    link: new HttpLink({
            // refer to documentation to best configure apollo client
            // https://www.apollographql.com/docs/link/links/http.html
            // uri: '',
            // credentials: ''
        })
})

export default client