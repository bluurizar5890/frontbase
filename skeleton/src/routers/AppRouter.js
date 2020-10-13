import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import ScrollToTop from '../App/layout/ScrollToTop'
import config from '../config'
import Aux from '../hoc/_Aux'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import Loadable from 'react-loadable';
import Loader from '../App/layout/Loader'
import PrivateRouteNoLayout from './PrivateRouteNoLayout'
import Login from '../App/components/base/Login'

const AdminLayout = Loadable({
    loader: () => import('../App/layout/AdminLayout'),
    loading: Loader
});

export const AppRouter = () => {
    const state = useSelector(state => state);
    const {logged=false,forzar_cambio_password}=state;
    return (
        <Router basename={config.basename}>
             <Aux>
                <ScrollToTop>
                    <Suspense fallback={<Loader/>}>
                            <PublicRoute  
                                path="/auth/login" 
                                isAuthenticated={logged} 
                                component={Login}
                            />
                            <PrivateRouteNoLayout 
                                path="/admin"
                                isAuthenticated={logged}
                            />
                            <PrivateRoute  
                                path='/'  
                                isAuthenticated={logged} 
                                component={AdminLayout} 
                                updatePass={forzar_cambio_password}
                            />
                    </Suspense>
                </ScrollToTop>
            </Aux>
        </Router>
    )
}
