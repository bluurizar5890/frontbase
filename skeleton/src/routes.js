import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const OtherSamplePage = React.lazy(() => import('./Demo/Other/SamplePage'));
const formulario = React.lazy(() => import('./Demo/Other/formvalidation'));
const persona = React.lazy(() => import('./App/pages/PersonaPage'));

const routes = [
    { path: '/sample-page', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/formulario', exact: true, name: 'Formulario', component: formulario },
    { path: '/persona', exact: true, name: 'persona', component: persona },
];

export default routes;