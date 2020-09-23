import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const OtherSamplePage = React.lazy(() => import('./Demo/Other/SamplePage'));
const persona = React.lazy(() => import('./App/pages/PersonaPage'));
const personaupsert = React.lazy(() => import('./App/pages/PersonaUpSertPage'));

const routes = [
    { path: '/sample-page', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/persona', exact: true, name: 'persona', component: persona },
    { path: '/personaupsert/:idpersona', exact: true, name: 'personaUpSert', component: personaupsert },
    { path: '/personaupsert', exact: true, name: 'personaUpSert', component: personaupsert },
];

export default routes;