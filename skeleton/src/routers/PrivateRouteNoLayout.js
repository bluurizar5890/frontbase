import React from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from '../route'

const PrivateRouteNoLayout = () => {
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
                                (<route.component {...props} />)
                            )} />
                    ) : (null);
                })
            }
        </Switch>
    )
}

export default PrivateRouteNoLayout;
