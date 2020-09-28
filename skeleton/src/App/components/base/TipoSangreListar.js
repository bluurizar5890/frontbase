import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import callApi from '../../../helpers/conectorApi';
import Aux from '../../../hoc/_Aux';
import withReactContent from 'sweetalert2-react-content';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { TipoSangreUpSert } from './TipoSangreUpSert';
const accesos = [1, 2, 3, 4];
export const TipoSangreListar = () => {
    const [abrirModal, setAbrirModal] = useState(false);
    const [catTipoSangre, setCatTipoSangre] = useState([]);
    const initData = {
        tipo_sangreId: '',
        descripcion: '',
        estadoId: 1
    };

    const [dataInicial, setdataInicial] = useState(initData);
    const handleOpenModal = () => {
        setAbrirModal(true);
        setdataInicial(initData);
    }
    const GetTipoSangre = async () => {
        let response = await callApi('tiposangre?estadoId=1;2');
        setCatTipoSangre(response);
    }
    const handleEditar = (id) => {
        const { tipo_sangreId, descripcion, estadoId } = catTipoSangre.find(item => item.tipo_sangreId === id);
        setdataInicial({
            tipo_sangreId,
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
                let response = await callApi(`tiposangre/${id}`, {
                    method
                });
                if (response) {
                    alert_exitoso(response);
                    let listActual = catTipoSangre.filter(item => item.tipo_sangreId !== id);
                    setCatTipoSangre(listActual);
                }
            } else {
                alert_warning('No se eliminó ningun elemento');
            }
        });
    }
    useEffect(() => {
        GetTipoSangre();
    }, []);
    return (
        <Aux>
            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Tipos de Sangre</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row className="align-items-center m-l-0">
                                <Col />
                                <Col className="text-right">
                                    {
                                        accesos.find(acceso => acceso === 1) &&
                                        <Button variant="success" className="btn-sm btn-round has-ripple" onClick={handleOpenModal}><i className="feather icon-plus" /> Agregar Tipo de Sangre</Button>
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
                                            <th>Estado</th>
                                            {
                                                accesos.find(acceso => acceso === 3 || acceso === 4) &&
                                                <th></th>
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            catTipoSangre.map(({ tipo_sangreId, descripcion, cat_estado: { descripcion: estado } }) => (
                                                <tr key={tipo_sangreId}>
                                                    <td>{tipo_sangreId}</td>
                                                    <td>{descripcion}</td>
                                                    <td>{estado}</td>
                                                    {
                                                        accesos.find(acceso => acceso === 3 || acceso === 4) &&
                                                        <td style={{ textAlign: "center" }}>
                                                            {
                                                                accesos.find(acceso => acceso === 3) &&
                                                                <button className="btn-icon btn btn-info btn-sm" onClick={() => { handleEditar(tipo_sangreId) }}><i className="feather icon-edit" /></button>
                                                            }
                                                            {
                                                                accesos.find(acceso => acceso === 4) &&
                                                                <button className="btn-icon btn btn-danger btn-sm" onClick={() => { handleDelete(tipo_sangreId) }}><i className="feather icon-trash-2" /></button>
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
                                <TipoSangreUpSert abrirModal={abrirModal} setAbrirModal={setAbrirModal} GetTipoSangre={GetTipoSangre} dataInicial={dataInicial} />
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}
