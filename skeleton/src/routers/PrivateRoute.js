import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route, Switch } from 'react-router-dom';
const Actualizarcontrasenia=React.lazy(() => import('../App/components/base/ActualizacionContrasenia'));
const PrivateRoute = ({
    isAuthenticated,
    component,
    updatePass
}) => {
    return (
        <Switch>
            {
                isAuthenticated === true ?
                    <>
                    {
                        updatePass===false ?
                        <Route
                            path="/"
                            component={component}
                        />
                        :<Redirect to="/admin/change-password" />
                    }
                    </>
                    : (<Redirect to="/auth/login" />)
            }
        </Switch>
    )
}

// PrivateRoute.propTypes = {

// }

export default PrivateRoute;
