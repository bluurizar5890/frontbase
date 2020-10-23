import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom'
const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    return (
            <Route {...rest}
                component={(props) => (
                    (!isAuthenticated) ?
                        (<Component {...props} />)
                        : (<Redirect to="/" />)
                )
                }
            />
        
    )
}

// PublicRoute.propTypes = {
//     isAuthenticated: PropTypes.bool.isRequired,
//     component: PropTypes.func.isRequired
// }

export default withRouter(PublicRoute);
