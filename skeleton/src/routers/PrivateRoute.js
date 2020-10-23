import React from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
const Actualizarcontrasenia = React.lazy(() => import('../App/components/base/ActualizacionContrasenia'));
const PrivateRoute = (props) => {

    // let location = useLocation();
    const {
        component,
        updatePass
    } = props;
    return (
        <Switch>
            {
                updatePass === false ?
                    <Route
                        path="/"
                        component={component}
                    />
                    : <Redirect to="/admin/change-password" />
            }
        </Switch>
    )
}

export default withRouter(PrivateRoute);
