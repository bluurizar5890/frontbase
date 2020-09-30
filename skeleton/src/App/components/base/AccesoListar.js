import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import callApi from '../../../helpers/conectorApi';
import Aux from '../../../hoc/_Aux';
import withReactContent from 'sweetalert2-react-content';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { AccesoUpSert } from './AccesoUpSert';
import { connect, useSelector } from 'react-redux';
const menuId = 1;
export const AccesoListar = () => {
    const state = useSelector(state => state);

    const [accesos, setAccesos] = useState([])
    const [abrirModal, setAbrirModal] = useState(false);
    const [catAcceso, setCatAcceso] = useState([]);
    const initData = {
        accesoId: '',
        descripcion: '',
        estadoId: 1
    };

    const GetAccesosByMenuId = () => {
        if (state?.accesos) {
            const { accesos } = state;
            const misAccesos = accesos.filter(item => item.menuId === menuId);
            setAccesos(misAccesos);
        }
    }

    const [dataInicial, setdataInicial] = useState(initData);
    const handleOpenModal = () => {
        setAbrirModal(true);
        setdataInicial(initData);
    }
    const GetAccesos = async () => {
        let response = await callApi('acceso?estadoId=1;2');
        setCatAcceso(response);
    }
    const handleEditar = (id) => {
        const { accesoId, descripcion, estadoId } = catAcceso.find(item => item.accesoId === id);
        setdataInicial({
            accesoId,
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
                let response = await callApi(`acceso/${id}`, {
                    method
                });
                if (response) {
                    alert_exitoso(response);
                    let listActual = catAcceso.filter(item => item.accesoId !== id);
                    setCatAcceso(listActual);
                }
            } else {
                alert_warning('No se eliminó ningún elemento');
            }
        });
    }
    useEffect(() => {
        GetAccesos();
        GetAccesosByMenuId();
    }, []);
    return (
        <Aux>
            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Listado de accesos</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row className="align-items-center m-l-0">
                                <Col />
                                <Col className="text-right">
                                    {
                                        accesos.find(acceso => acceso.accesoId === 1) &&
                                        <Button variant="success" className="btn-sm btn-round has-ripple" onClick={handleOpenModal}><i className="feather icon-plus" /> Agregar Acceso</Button>
                                    }
                                </Col>
                            </Row>
                            {
                                accesos.find(acceso => acceso.accesoId === 2) &&
                                <Table striped hover responsive bordered id="mytable">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Descripción</th>
                                            <th>Estado</th>
                                            {
                                                accesos.find(acceso => acceso.accesoId === 3 || acceso.accesoId === 4) &&
                                                <th></th>
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            catAcceso.map(({ accesoId, descripcion, cat_estado: { descripcion: estado } }) => (
                                                <tr key={accesoId}>
                                                    <td>{accesoId}</td>
                                                    <td>{descripcion}</td>
                                                    <td>{estado}</td>
                                                    {
                                                        accesos.find(acceso => acceso.accesoId === 3 || acceso.accesoId === 4) &&
                                                        <td style={{ textAlign: "center" }}>
                                                            {
                                                                accesos.find(acceso => acceso.accesoId === 3) &&
                                                                <button className="btn-icon btn btn-info btn-sm" onClick={() => { handleEditar(accesoId) }}><i className="feather icon-edit" /></button>
                                                            }
                                                            {
                                                                accesos.find(acceso => acceso.accesoId === 4) &&
                                                                <button className="btn-icon btn btn-danger btn-sm" onClick={() => { handleDelete(accesoId) }}><i className="feather icon-trash-2" /></button>
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
                                <AccesoUpSert abrirModal={abrirModal} setAbrirModal={setAbrirModal} GetAccesos={GetAccesos} dataInicial={dataInicial} />
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}
