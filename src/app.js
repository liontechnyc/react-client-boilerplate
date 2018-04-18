import { render, hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { Provider as ReduxProvider } from 'react-redux'
import client from './graphql/client'
import store from './redux'
import Views from './views'
import * as serviceWorker from './serviceWorker'
// Styles
import './styles/core.css'

const App = (
    <BrowserRouter>
        <ApolloProvider client={client}>
            <ReduxProvider store={store}>
                <Views/>
            </ReduxProvider>
        </ApolloProvider>
    </BrowserRouter>
)

const root = document.getElementById('app-root')

if(process.env.NODE_ENV !== 'production'){
    render(App, root)
}
else{
    // For SSR only
    hydrate(App, root)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()