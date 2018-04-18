export const update = user => {
    return {
        type: 'UPDATE_USER',
        user
    }
}

export const reset = () => {
    return {
        type: 'RESET_USER'
    }
}