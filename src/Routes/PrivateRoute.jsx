import { React, useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
// import { isAuthenticated } from "../../services/auth";
import StoreContext from '../services/Context'




const PrivateRoute = ({ component: Component, ...rest }) => {
    // <Route {...rest} render={(props) => (isAuthenticated() ? <Component {...props} /> : <Redirect to={{ pathname: "/", state: { from: props.location } }} /> )} />

    const { token } = useContext(StoreContext);

    return(
        <Route {...rest} render={() => token ? <Component {...rest} /> : <Redirect to="/login" />} />
    )
}

export default PrivateRoute;