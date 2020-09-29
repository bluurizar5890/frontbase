import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import callApi from '../../../helpers/conectorApi';
import Aux from '../../../hoc/_Aux';
import withReactContent from 'sweetalert2-react-content';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { MenuUpSert } from './MenuUpSert';
import { MenuAcceso } from './MenuAcceso';
import { limpiarEstiloTabla,asignarEstiloTabla } from '../../../helpers/estiloTabla';
const accesos = [1, 2, 3, 4, 5];
export const MenuListar = () => {
    const [abrirModal, setAbrirModal] = useState(false);
    const [abrirModalAcceso, setAbrirModalAcceso] = useState(false);
    const [catMenu, setCatMenu] = useState([]);
    const [catAcceso, setCatAcceso] = useState([]);
    const initData = {
        menuId: '',
        posicion: '',
        descripcion: '',
        href: '',
        icono: '',
        menu_padreId: 0,
        estadoId: 1
    };

    const [dataInicial, setdataInicial] = useState(initData);
    const handleOpenModal = () => {
        setAbrirModal(true);
        setdataInicial(initData);
    }
    const GetCatMenu = async () => {
        let response = await callApi('menu?estadoId=1;2');
        if(response){
            limpiarEstiloTabla("#mytable");
            setCatMenu(response);
            asignarEstiloTabla("#mytable");
        }
    }
    const handleEditar = (id) => {
        const { menuId, posicion, descripcion, href, icono, menu_padreId, estadoId } = catMenu.find(item => item.menuId === id);
        setdataInicial({
            menuId,
            posicion,
            descripcion,
            href,
            icono,
            menu_padreId,
            estadoId
        });
        setAbrirModal(true);
    }
    const handleAcceso = (id) => {
        const { menuId, posicion, descripcion, href, icono, menu_padreId, estadoId } = catMenu.find(item => item.menuId === id);
        setdataInicial({
            menuId,
            posicion,
            descripcion,
            href,
            icono,
            menu_padreId,
            estadoId
        });
        setAbrirModalAcceso(true);
    }


    const handleDelete = (id) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: 'Alerta?',
            text: 'Esta seguro que desea eliminar el elemento',
            type: 'warning',
            showCloseButton: true,
            showCancelButton: true
        }).then(async (willDelete) => {
            if (willDelete.value) {
                let method = 'DELETE';
                let response = await callApi(`menu/${id}`, {
                    method
                });
                if (response) {
                    alert_exitoso(response);
                    let listActual = catMenu.filter(item => item.menuId !== id);
                    setCatMenu(listActual);
                }
            } else {
                alert_warning('No se eliminó ningún elemento');
            }
        });
    }
    const GetAccesos = async () => {
        let response = await callApi('acceso?estadoId=1');
        if (response) {
            setCatAcceso(response);
        }
    }
    useEffect(() => {
        GetCatMenu();
        GetAccesos();
    }, []);
    return (
        <Aux>
            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Menu</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row className="align-items-center m-l-0">
                                <Col />
                                <Col className="text-right">
                                    {
                                        accesos.find(acceso => acceso === 1) &&
                                        <Button variant="success" className="btn-sm btn-round has-ripple" onClick={handleOpenModal}><i className="feather icon-plus" /> Agregar Menu</Button>
                                    }
                                </Col>
                            </Row>
                            {
                                accesos.find(acceso => acceso === 2) &&
                                <Table striped hover responsive bordered id="mytable">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Descripción</th>
                                            <th>Posición</th>
                                            <th>Href</th>
                                            <th>Icono</th>
                                            <th>Menu Padre</th>
                                            <th>Estado</th>
                                            {
                                                accesos.find(acceso => acceso === 5) && <th>Acciones</th>
                                            }
                                            {
                                                accesos.find(acceso => acceso === 3 || acceso === 4) &&
                                                <th></th>
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            catMenu.map(({ menuId, descripcion, posicion, href, icono, menu_padreId, cat_estado: { descripcion: estado } }) => {
                                                const item = catMenu.find(item => item.menuId === menu_padreId);
                                                const { descripcion: descPadre } = !!item && item;
                                                return (
                                                    <tr key={menuId}>
                                                        <td>{menuId}</td>
                                                        <td>{descripcion}</td>
                                                        <td>{posicion}</td>
                                                        <td>{href}</td>
                                                        <td>{icono}</td>
                                                        <td>{descPadre}</td>
                                                        <td>{estado}</td>
                                                        {
                                                            accesos.find(acceso => acceso === 5) &&
                                                            <td style={{ textAlign: "center" }}>
                                                                <button className="btn-icon btn btn-info btn-sm" onClick={() => { handleAcceso(menuId) }}><i className="feather icon-zap" /></button>
                                                            </td>
                                                        }
                                                        {
                                                            accesos.find(acceso => acceso === 3 || acceso === 4) &&
                                                            <td style={{ textAlign: "center" }}>

                                                                {
                                                                    accesos.find(acceso => acceso === 3) &&
                                                                    <button className="btn-icon btn btn-info btn-sm" onClick={() => { handleEditar(menuId) }}><i className="feather icon-edit" /></button>
                                                                }
                                                                {
                                                                    accesos.find(acceso => acceso === 4) &&
                                                                    <button className="btn-icon btn btn-danger btn-sm" onClick={() => { handleDelete(menuId) }}><i className="feather icon-trash-2" /></button>
                                                                }
                                                            </td>
                                                        }
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            }
                            {
                                abrirModal === true &&
                                <MenuUpSert abrirModal={abrirModal} setAbrirModal={setAbrirModal} GetCatMenu={GetCatMenu} catMenu={catMenu} dataInicial={dataInicial} />
                            }
                            {
                                abrirModalAcceso === true &&
                                <MenuAcceso abrirModal={abrirModalAcceso} setAbrirModal={setAbrirModalAcceso} GetCatMenu={GetCatMenu} catAcceso={catAcceso} menuId={dataInicial.menuId} />
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}
