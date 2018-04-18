// EXAMPLE REDUX MIDDLEWARE

// Log when an action is triggered
const logger = store => next => action => {
    console.log("Redux action:", action)
    next(action)
}

export default logger