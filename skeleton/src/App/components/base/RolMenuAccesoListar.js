import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import callApi from '../../../helpers/conectorApi';
import Aux from '../../../hoc/_Aux';
import withReactContent from 'sweetalert2-react-content';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { RolMenuAccesoUpSert } from './RolMenuAccesoUpSert';
import { limpiarEstiloTabla,asignarEstiloTabla } from '../../../helpers/estiloTabla';
const accesos = [1, 2, 3, 4];
export const RolMenuAccesoListar = ({idrol}) => {
    
    const [abrirModal, setAbrirModal] = useState(false);
    const [catMenu, setCatMenu] = useState([]);
    const [rolMenuAcceso, setRolMenuAcceso] = useState([]);
    const [infoRol, setInfoRol] = useState([]);
    const initData = {
        menuId:'',
        rolId: idrol,
        menu_accesoId: '',
        estadoId: 1
    };

    const [dataInicial, setdataInicial] = useState(initData);
    const handleOpenModal = () => {
        setAbrirModal(true);
        setdataInicial(initData);
    }
    const GetCatMenu = async () => {
        let response = await callApi('menu?estadoId=1');
        if (response) {
            setCatMenu(response);
        }
    }
    const GetRolMenuAcceso = async (id) => {
        let response = await callApi(`rolmenuacceso?rolId=${id}&estadoId=1;2`);
        if (response) {
            limpiarEstiloTabla("#mytable");
            setRolMenuAcceso(response);
            asignarEstiloTabla("#mytable");
        }
    }
    const GetInfoRol = async (id) => {
        let response = await callApi(`rol?id=${id}&include=0`);
        if (response) {
            setInfoRol(response[0]);
        }
    }
    const handleEditar = (id) => {
        const { rol_menu_accesoId,rolId, menu_accesoId, estadoId,menu_acceso:{menuId} } = rolMenuAcceso.find(item => item.rol_menu_accesoId === id);
        setdataInicial({
            rol_menu_accesoId,
            menu_accesoId,
            estadoId,
            menuId,
            rolId
        });
        setAbrirModal(true);
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
                let response = await callApi(`rolmenuacceso/${id}`, {
                    method
                });
                if (response) {
                    alert_exitoso(response);
                    let listActual = rolMenuAcceso.filter(item => item.rol_menu_accesoId !== id);
                    setRolMenuAcceso(listActual);
                }
            } else {
                alert_warning('No se eliminó ningun elemento');
            }
        });
    }
    useEffect(() => {
        GetCatMenu();
    }, []);

    useEffect(() => {
        GetInfoRol(idrol);
        GetRolMenuAcceso(idrol);
    }, [idrol])
    return (
        <Aux>
            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">{`${infoRol.nombre}`} Permisos</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row className="align-items-center m-l-0">
                                <Col />
                                <Col className="text-right">
                                    {
                                        accesos.find(acceso => acceso === 1) &&
                                        <Button variant="success" className="btn-sm btn-round has-ripple" onClick={handleOpenModal}><i className="feather icon-plus" /> Agregar Permiso</Button>
                                    }
                                </Col>
                            </Row>
                            {
                                accesos.find(acceso => acceso === 2) &&
                                <Table striped hover responsive bordered id="mytable">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Menu</th>
                                            <th>Acceso</th>
                                            <th>Estado</th>
                                            {
                                                accesos.find(acceso => acceso === 3 || acceso === 4) &&
                                                <th></th>
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            rolMenuAcceso.map(({ rol_menu_accesoId, menu_acceso: { cat_menu: { descripcion: descMenu }, cat_acceso: { descripcion: desAcceso } }, cat_estado: { descripcion: descEstado } }) => {
                                                return (
                                                    <tr key={rol_menu_accesoId}>
                                                        <td>{rol_menu_accesoId}</td>
                                                        <td>{descMenu}</td>
                                                        <td>{desAcceso}</td>
                                                        <td>{descEstado}</td>
                                                        {
                                                            accesos.find(acceso => acceso === 3 || acceso === 4) &&
                                                            <td style={{ textAlign: "center" }}>

                                                                {
                                                                    accesos.find(acceso => acceso === 3) &&
                                                                    <button className="btn-icon btn btn-info btn-sm" onClick={() => { handleEditar(rol_menu_accesoId) }}><i className="feather icon-edit" /></button>
                                                                }
                                                                {
                                                                    accesos.find(acceso => acceso === 4) &&
                                                                    <button className="btn-icon btn btn-danger btn-sm" onClick={() => { handleDelete(rol_menu_accesoId) }}><i className="feather icon-trash-2" /></button>
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
                                <RolMenuAccesoUpSert abrirModal={abrirModal} setAbrirModal={setAbrirModal} catMenu={catMenu} dataInicial={dataInicial} GetRolMenuAcceso={GetRolMenuAcceso} />
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}
