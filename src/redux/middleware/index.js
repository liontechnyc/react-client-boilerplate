// Add Redux Middlewares here
import { applyMiddleware } from 'redux'

// Example middleware
import logger from './logger'

export default applyMiddleware(
    logger
)