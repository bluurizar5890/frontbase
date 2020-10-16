import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const login = React.lazy(() => import('./App/pages/LoginPage'));
const OtherSamplePage = React.lazy(() => import('./Demo/Other/SamplePage'));
const pais=React.lazy(() => import('./App/pages/PaisPage'));
const departamento=React.lazy(() => import('./App/pages/DepartamentoPage'));
const municipio=React.lazy(() => import('./App/pages/MunicipioPage'));
const tipodocumento=React.lazy(() => import('./App/pages/TipoDocumentoPage'));
const tipotelefono=React.lazy(() => import('./App/pages/TipoTelefonoPage'));
const tiposangre=React.lazy(() => import('./App/pages/TipoSangrePage'));
const estadocivil=React.lazy(() => import('./App/pages/EstadoCivilPage'));
const acceso=React.lazy(() => import('./App/pages/AccesoPage'));
const menu=React.lazy(() => import('./App/pages/MenuPage'));
const rol=React.lazy(() => import('./App/pages/RolPage'));
const rolmenuacceso=React.lazy(() => import('./App/pages/RolMenuAccesoPage'));
const persona = React.lazy(() => import('./App/pages/PersonaPage'));
const personaupsert = React.lazy(() => import('./App/pages/PersonaUpSertPage'));
const usuario = React.lazy(() => import('./App/pages/UsuarioPage'));

const routes = [
    { path: '/catalogo/pais', exact: true, name: 'Pais', component: pais },
    { path: '/catalogo/departamento', exact: true, name: 'Departamento', component: departamento },
    { path: '/catalogo/municipio', exact: true, name: 'Municipio', component: municipio },
    { path: '/catalogo/tipodocumento', exact: true, name: 'TipoDocumento', component: tipodocumento },
    { path: '/catalogo/tiposangre', exact: true, name: 'TipoSangre', component: tiposangre },
    { path: '/catalogo/tipotelefono', exact: true, name: 'TipoTelefono', component: tipotelefono },
    { path: '/catalogo/estadocivil', exact: true, name: 'EstadoCivil', component: estadocivil },
    { path: '/seguridad/acceso', exact: true, name: 'Acceso', component: acceso },
    { path: '/seguridad/menu', exact: true, name: 'Menu', component: menu },
    { path: '/seguridad/rol', exact: true, name: 'Rol', component: rol },
    { path: '/seguridad/rolmenuacceso/:idrol', exact: true, name: 'RolMenuAcceso', component: rolmenuacceso },
    { path: '/sample-page', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/catalogo/persona', exact: true, name: 'persona', component: persona },
    { path: '/catalogo/personaupsert/:idpersona', exact: true, name: 'personaUpSert', component: personaupsert },
    { path: '/catalogo/personaupsert', exact: true, name: 'personaUpSert', component: personaupsert },
    { path: '/seguridad/usuario', exact: true, name: 'Usuario', component: usuario },
];

export default routes;