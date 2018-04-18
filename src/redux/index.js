import { createStore } from 'redux'
import middlewares from './middleware'
import app from './app'

const preloadedState = window.__PRELOADED_STATE__

// Dereference SSR state
delete window.__PRELOADED_STATE__ 

export default createStore(app, preloadedState, middlewares)