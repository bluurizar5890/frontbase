import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import callApi from '../../../helpers/conectorApi';
import Aux from '../../../hoc/_Aux';
import { IdentificacionUpSert } from './IdentificacionUpSert';
import withReactContent from 'sweetalert2-react-content';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
const accesos = [1,2,3,4];
export const IdentificacionListar = ({ personaId }) => {
    const [abrirModal, setAbrirModal] = useState(false);
    const [catTipoDocumento, setCatTipoDocumento] = useState([]);
    const [identificaciones, setIdentificaciones] = useState([]);
    const initData = {
        personaId,
        tipo_documentoId: '',
        numero_identificacion: '',
        estadoId: 1
    };

    const [dataInicial, setdataInicial] = useState(initData);
    const handleOpenModal = () => {
        setAbrirModal(true);
        setdataInicial(initData);
    }
    const GetTiposIdentificaciones = async () => {
        let response = await callApi('tipodocumento?estadoId=1');
        setCatTipoDocumento(response);
    }
    const GetIdentificaciones = async (id) => {
        let response = await callApi(`persona/identificacion?personaId=${id}&estadoId=1;2`);
        setIdentificaciones(response);
    }
    const handleEditar = (id) => {
        const { identificacion_personaId, tipo_documentoId, numero_identificacion, estadoId } = identificaciones.find(item => item.identificacion_personaId === id);
        setdataInicial({
            identificacion_personaId,
            tipo_documentoId,
            numero_identificacion,
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
                let response = await callApi(`persona/identificacion/${id}`, {
                    method
                });
                if (response) {
                    alert_exitoso(response);
                    GetIdentificaciones(personaId);
                }
            } else {
                alert_warning('No se eliminó ningun elemento');
            }
        });
    }
    useEffect(() => {
        GetTiposIdentificaciones();
        GetIdentificaciones(personaId);
    }, [personaId]);
    return (
        <Aux>
            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Documentos de identificación</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row className="align-items-center m-l-0">
                                <Col />
                                <Col className="text-right">
                                    {
                                        accesos.find(acceso => acceso === 1) &&
                                        <Button variant="success" className="btn-sm btn-round has-ripple" onClick={handleOpenModal}><i className="feather icon-plus" /> Agregar documento</Button>
                                    }
                                </Col>
                            </Row>
                            {
                                accesos.find(acceso => acceso === 2) &&
                                <Table striped hover responsive bordered id="table_dentificaciones_persona">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Tipo</th>
                                            <th>Número</th>
                                            <th>Estado</th>
                                            {
                                                accesos.find(acceso => acceso === 3 || acceso === 4) &&
                                                <th></th>
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            identificaciones.map(({ identificacion_personaId, cat_tipo_documento: { descripcion: tipoDoc }, numero_identificacion, cat_estado: { descripcion: estado } }) => (
                                                <tr key={identificacion_personaId}>
                                                    <td>{identificacion_personaId}</td>
                                                    <td>{tipoDoc}</td>
                                                    <td>{numero_identificacion}</td>
                                                    <td>{estado}</td>
                                                    {
                                                        accesos.find(acceso => acceso === 3 || acceso === 4) &&
                                                        <td style={{ textAlign: "center" }}>
                                                            {
                                                                accesos.find(acceso => acceso === 3) &&
                                                                <button className="btn-icon btn btn-info btn-sm" onClick={() => { handleEditar(identificacion_personaId) }}><i className="feather icon-edit" /></button>
                                                            }
                                                            {
                                                                accesos.find(acceso => acceso === 4) &&
                                                                <button className="btn-icon btn btn-danger btn-sm" onClick={() => { handleDelete(identificacion_personaId) }}><i className="feather icon-trash-2" /></button>
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
                                <IdentificacionUpSert abrirModal={abrirModal} setAbrirModal={setAbrirModal} catTipoDocumento={catTipoDocumento} personaId={personaId} GetIdentificaciones={GetIdentificaciones} dataInicial={dataInicial} />
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}
