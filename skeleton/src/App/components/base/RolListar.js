import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import callApi from '../../../helpers/conectorApi';
import Aux from '../../../hoc/_Aux';
import withReactContent from 'sweetalert2-react-content';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { RolUpSert } from './RolUpSert';
import { Link } from 'react-router-dom';
const accesos = [1, 2, 3, 4];
export const RolListar = () => {
    const [abrirModal, setAbrirModal] = useState(false);
    const [catRol, setCatRol] = useState([]);
    const [catMenu, setCatMenu] = useState([]);
    const initData = {
        rolId: '',
        nombre:'',
        descripcion: '',
        estadoId: 1
    };

    const [dataInicial, setdataInicial] = useState(initData);
    const handleOpenModal = () => {
        setAbrirModal(true);
        setdataInicial(initData);
    }
    const GetCatRol = async () => {
        let response = await callApi('rol?estadoId=1;2');
        if(response){
            setCatRol(response);
        }
    }
    const handleEditar = (id) => {
        const { rolId,nombre, descripcion, estadoId } = catRol.find(item => item.rolId === id);
        setdataInicial({
            rolId,
            nombre,
            descripcion,
            estadoId
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
                let response = await callApi(`tipodocumento/${id}`, {
                    method
                });
                if (response) {
                    alert_exitoso(response);
                    let listActual = catRol.filter(item => item.rolId !== id);
                    setCatRol(listActual);
                }
            } else {
                alert_warning('No se eliminó ningun elemento');
            }
        });
    }
    const GetCatMenu = async () => {
        let response = await callApi('menu?estadoId=1');
        setCatMenu(response);
    }

    useEffect(() => {
        GetCatRol();
        GetCatMenu();
    }, []);
    return (
        <Aux>
            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Roles</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row className="align-items-center m-l-0">
                                <Col />
                                <Col className="text-right">
                                    {
                                        accesos.find(acceso => acceso === 1) &&
                                        <Button variant="success" className="btn-sm btn-round has-ripple" onClick={handleOpenModal}><i className="feather icon-plus" /> Agregar Nuevo Rol</Button>
                                    }
                                </Col>
                            </Row>
                            {
                                accesos.find(acceso => acceso === 2) &&
                                <Table striped hover responsive bordered id="mytable">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Nombre</th>
                                            <th>Descripción</th>
                                            <th>Estado</th>
                                            <th>Permisos</th>
                                            {
                                                accesos.find(acceso => acceso === 3 || acceso === 4) &&
                                                <th></th>
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            catRol.map(({ rolId,nombre, descripcion, cat_estado: { descripcion: estado } }) => (
                                                <tr key={rolId}>
                                                    <td>{rolId}</td>
                                                    <td>{nombre}</td>
                                                    <td>{descripcion}</td>
                                                    <td>{estado}</td>
                                                    <td style={{ textAlign: "center" }}>
                                                    <Link className="btn-icon btn btn-info btn-sm" to={`/seguridad/rolmenuacceso/${rolId}`}><i className="feather icon-lock" /></Link>
                                                    </td>
                                                    {
                                                        accesos.find(acceso => acceso === 3 || acceso === 4) &&
                                                        <td style={{ textAlign: "center" }}>
                                                            {
                                                                accesos.find(acceso => acceso === 3) &&
                                                                <button className="btn-icon btn btn-info btn-sm" onClick={() => { handleEditar(rolId) }}><i className="feather icon-edit" /></button>
                                                            }
                                                            {
                                                                accesos.find(acceso => acceso === 4) &&
                                                                <button className="btn-icon btn btn-danger btn-sm" onClick={() => { handleDelete(rolId) }}><i className="feather icon-trash-2" /></button>
                                                            }
                                                        </td>
                                                    }
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            }
                            {
                                abrirModal === true &&
                                <RolUpSert abrirModal={abrirModal} setAbrirModal={setAbrirModal} GetCatRol={GetCatRol} dataInicial={dataInicial} />
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}
