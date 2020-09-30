export default {
    items: [
        {
            id: 'support',
            title: 'Navigation',
            type: 'group',
            icon: 'icon-support',
            children: [
                {
                    id: 'sample-page',
                    title: 'Sample Page',
                    type: 'item',
                    url: '/sample-page',
                    classes: 'nav-item',
                    icon: 'feather icon-sidebar'
                },
                {
                    id: 'login',
                    title: 'Login',
                    type: 'item',
                    url: '/auth/login',
                    classes: 'nav-item',
                    icon: 'feather icon-sidebar'
                },
                {
                    id: 'persona',
                    title: 'Persona',
                    type: 'item',
                    url: '/catalogo/persona',
                    classes: 'nav-item',
                    icon: 'feather icon-sidebar'
                },
                {
                    id: 'pais',
                    title: 'Pais',
                    type: 'item',
                    url: '/catalogo/pais',
                    classes: 'nav-item',
                    icon: 'feather icon-sidebar'
                },
                {
                    id: 'departamento',
                    title: 'Departamento',
                    type: 'item',
                    url: '/catalogo/departamento',
                    classes: 'nav-item',
                    icon: 'feather icon-sidebar'
                },
                {
                    id: 'municipio',
                    title: 'Municipio',
                    type: 'item',
                    url: '/catalogo/municipio',
                    classes: 'nav-item',
                    icon: 'feather icon-sidebar'
                },
                {
                    id: 'tipodocumento',
                    title: 'Tipo Documento',
                    type: 'item',
                    url: '/catalogo/tipodocumento',
                    classes: 'nav-item',
                    icon: 'feather icon-sidebar'
                },
                {
                    id: 'tipotelefono',
                    title: 'Tipo Teléfono',
                    type: 'item',
                    url: '/catalogo/tipotelefono',
                    classes: 'nav-item',
                    icon: 'feather icon-sidebar'
                },
                {
                    id: 'tiposangre',
                    title: 'Tipo Sangre',
                    type: 'item',
                    url: '/catalogo/tiposangre',
                    classes: 'nav-item',
                    icon: 'feather icon-sidebar'
                },
                {
                    id: 'estadocivil',
                    title: 'Estado Civil',
                    type: 'item',
                    url: '/catalogo/estadocivil',
                    classes: 'nav-item',
                    icon: 'feather icon-sidebar'
                },
                {
                    id: 'acceso',
                    title: 'Accesos',
                    type: 'item',
                    url: '/seguridad/acceso',
                    classes: 'nav-item',
                    icon: 'feather icon-sidebar'
                },
                {
                    id: 'menu',
                    title: 'Menu',
                    type: 'item',
                    url: '/seguridad/menu',
                    classes: 'nav-item',
                    icon: 'feather icon-sidebar'
                },
                {
                    id: 'rol',
                    title: 'Rol',
                    type: 'item',
                    url: '/seguridad/rol',
                    classes: 'nav-item',
                    icon: 'feather icon-sidebar'
                },
                {
                    id: 'rolmenuacceso',
                    title: 'Rol Menu Acceso',
                    type: 'item',
                    url: '/seguridad/rolmenuacceso/1',
                    classes: 'nav-item',
                    icon: 'feather icon-sidebar'
                },
                {
                    id: 'usuario',
                    title: 'Usuarios',
                    type: 'item',
                    url: '/seguridad/usuario',
                    classes: 'nav-item',
                    icon: 'feather icon-sidebar'
                },
                {
                    id: 'menu-level',
                    title: 'Menu Levels',
                    type: 'collapse',
                    icon: 'feather icon-menu',
                    children: [
                        {
                            id: 'menu-level-1.1',
                            title: 'Menu Level 1.1',
                            type: 'item',
                            url: '#!',
                        },
                        {
                            id: 'menu-level-1.2',
                            title: 'Menu Level 2.2',
                            type: 'collapse',
                            children: [
                                {
                                    id: 'menu-level-2.1',
                                    title: 'Menu Level 2.1',
                                    type: 'item',
                                    url: '#',
                                },
                                {
                                    id: 'menu-level-2.2',
                                    title: 'Menu Level 2.2',
                                    type: 'collapse',
                                    children: [
                                        {
                                            id: 'menu-level-3.1',
                                            title: 'Menu Level 3.1',
                                            type: 'item',
                                            url: '#',
                                        },
                                        {
                                            id: 'menu-level-3.2',
                                            title: 'Menu Level 3.2',
                                            type: 'item',
                                            url: '#',
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'disabled-menu',
                    title: 'Disabled Menu',
                    type: 'item',
                    url: '#',
                    classes: 'nav-item disabled',
                    icon: 'feather icon-power'
                }
            ]
        }
    ]
}