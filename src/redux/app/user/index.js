const ANONYMOUS_USER = { id: null, email: null, name: null }

export default (state = ANONYMOUS_USER, action) => {
    switch(action.type){
        case 'UPDATE_USER':
            return action.user
        case 'RESET_USER':
            return ANONYMOUS_USER
        default:
            return state
    }
}