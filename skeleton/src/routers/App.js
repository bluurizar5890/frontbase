import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable';
import Loader from '../App/layout/Loader'
import Login from '../App/components/base/Login';
import { ResetPassword } from '../App/components/base/ResetPassword'
import { UpdatePassword } from '../App/components/base/UpdatePassword'
import Actualizarcontrasenia from '../App/components/base/ActualizacionContrasenia'
import config from '../config';
const AdminLayout = Loadable({
    loader: () => import('../App/layout/AdminLayout'),
    loading: Loader
});
const Rutas = () => {
    return (
        <BrowserRouter basename={config.basename}>
            <Switch>
                <Route exact path="/auth/login" component={Login}/>
                <Route exact path="/auth/reset-password" component={ResetPassword}/>
                <Route exact path="/admin/change-password" component={Actualizarcontrasenia}/>
                <Route exact path="/auth/update-password/:id" component={UpdatePassword}/>
                <Route path="/" component={AdminLayout} />
            </Switch>
        </BrowserRouter>
    )
}

export default Rutas;
