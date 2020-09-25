import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const OtherSamplePage = React.lazy(() => import('./Demo/Other/SamplePage'));
const pais=React.lazy(() => import('./App/pages/PaisPage'));
const persona = React.lazy(() => import('./App/pages/PersonaPage'));
const personaupsert = React.lazy(() => import('./App/pages/PersonaUpSertPage'));
const rol=React.lazy(() => import('./App/pages/RolPage'));

const routes = [
    { path: '/sample-page', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/catalogo/pais', exact: true, name: 'Pais', component: pais },
    { path: '/catalogo/persona', exact: true, name: 'persona', component: persona },
    { path: '/catalogo/personaupsert/:idpersona', exact: true, name: 'personaUpSert', component: personaupsert },
    { path: '/catalogo/personaupsert', exact: true, name: 'personaUpSert', component: personaupsert },
    { path: '/seguridad/rol', exact: true, name: 'rol', component: rol },
];

export default routes;