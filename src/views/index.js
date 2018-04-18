import { Switch, Route } from 'react-router-dom'
// Views
import Home from './Home'

const Views = props => {
    return(
        <Switch>
            <Route path="/" exact component={Home}/>
        </Switch>
    )
}

export default Views