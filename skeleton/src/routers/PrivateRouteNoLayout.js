import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route, Switch } from 'react-router-dom'
import routes from '../route'

const PrivateRouteNoLayout = ({
    isAuthenticated
}) => {
    return (
        <Switch>
            {
                routes.map((route, index) => {
                    return (route.component) ? (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            render={props => (
                                (isAuthenticated) ?
                                    (<route.component {...props} />)
                                    : (<Redirect to="/auth/login" />)
                            )} />
                    ) : (null);
                })
            }
        </Switch>
    )
}

// PrivateRouteNoLayout.propTypes = {
//     isAuthenticated: PropTypes.bool.isRequired,
//     component: PropTypes.func.isRequired
// }

export default PrivateRouteNoLayout;
