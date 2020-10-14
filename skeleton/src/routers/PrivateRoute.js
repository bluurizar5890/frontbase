import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
const Actualizarcontrasenia=React.lazy(() => import('../App/components/base/ActualizacionContrasenia'));
const PrivateRoute = (props) => {

    // let location = useLocation();
    const{
        isAuthenticated,
        component,
        updatePass
    }=props;
    console.log("Props",props);
    // localStorage.setItem('lastPath',location.pathname);
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
