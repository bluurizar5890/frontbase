import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route, Switch, useLocation, withRouter } from 'react-router-dom';
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
