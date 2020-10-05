import React from 'react';

const Login=React.lazy(() => import('./App/components/base/Login'));
const route = [
    { path: '/auth/login', exact: true, name: 'Login', component: Login }
];

export default route;