import React, { Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'
import ScrollToTop from '../App/layout/ScrollToTop'
import config from '../config'
import Aux from '../hoc/_Aux'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import Loadable from 'react-loadable';
import Loader from '../App/layout/Loader'
import PrivateRouteNoLayout from './PrivateRouteNoLayout'
import { loginBackend } from '../actions/auth'
import Login from '../App/components/base/Login';
import Cookies from 'js-cookie'
import { ResetPassword } from '../App/components/base/ResetPassword'
import { UpdatePassword } from '../App/components/base/UpdatePassword'
const AdminLayout = Loadable({
    loader: () => import('../App/layout/AdminLayout'),
    loading: Loader
});

export const AppRouter = (props) => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const [cambioPass, setCambioPass] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const getInfoUser = () => {
        let token = Cookies.get("auth");
        if (token) {
            dispatch(loginBackend({ logged: true }));
        } else {
            setIsAuthenticated(false);
        }
    }

    const prueba = _ => {
        const { logged, forzar_cambio_password } = state;
        setCambioPass(forzar_cambio_password);
        setIsAuthenticated(logged);
        console.log("Se cambio en redux");
    }

    useEffect(() => {
        getInfoUser();
    }, []);

    useEffect(() => {
        prueba();
    }, [state]);

    console.log(props);

    return (
        <Router basename={config.basename}>
            <Aux>
                <ScrollToTop>
                    <Suspense fallback={<Loader />}>
                        <PublicRoute
                            path="/auth/login"
                            isAuthenticated={isAuthenticated}
                            component={Login}
                        />
                        <PublicRoute
                            path="/auth/reset-password"
                            isAuthenticated={isAuthenticated}
                            component={ResetPassword}
                        />
                         <PublicRoute
                            path="/auth/update-password"
                            isAuthenticated={isAuthenticated}
                            component={UpdatePassword}
                        />
                        {
                            isAuthenticated === true &&
                            <>
                                <PrivateRouteNoLayout
                                    path="/admin"
                                />
                                <PrivateRoute
                                    path='/'
                                    component={AdminLayout}
                                    updatePass={cambioPass}
                                />
                            </>
                        }
                        {
                            // isAuthenticated && isAuthenticated === false &&
                            isAuthenticated === false &&
                            <Redirect to="/auth/login" />
                        }

                    </Suspense>
                </ScrollToTop>
            </Aux>
        </Router>
    )
}
