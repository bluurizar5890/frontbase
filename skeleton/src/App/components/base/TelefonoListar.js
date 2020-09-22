import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import callApi from '../../../helpers/conectorApi';
import Aux from '../../../hoc/_Aux';
import withReactContent from 'sweetalert2-react-content';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { TelefonoUpSert } from './TelefonoUpSert';
const accesos = [1, 2, 3, 4];
export const TelefonoListar = ({ personaId }) => {
    const [abrirModal, setAbrirModal] = useState(false);
    const [catTipoTelefono, setCatTipoTelefono] = useState([]);
    const [telefonos, setTelefonos] = useState([]);
    const initData = {
        personaId,
        tipo_telefonoId: '',
        telefono: '',
        estadoId: 1
    };
    const [dataInicial, setdataInicial] = useState(initData);
    const handleOpenModal = () => {
        setAbrirModal(true);
        setdataInicial(initData);
    }
    const GetTipoTelefono = async () => {
        let response = await callApi('tipotelefono?estadoId=1');
        setCatTipoTelefono(response);
    }
    const GetTelefonos = async (id) => {
        let response = await callApi(`persona/telefono?personaId=${id}&estadoId=1;2`);
        setTelefonos(response);
    }
    const handleEditar = (id) => {
        const { telefono_personaId, tipo_telefonoId, telefono, estadoId } = telefonos.find(item => item.telefono_personaId === id);
        setdataInicial({
            telefono_personaId,
            tipo_telefonoId,
            telefono,
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
                let response = await callApi(`persona/telefono/${id}`, {
                    method
                });
                if (response) {
                    alert_exitoso(response);
                    GetTelefonos(personaId);
                }
            } else {
                alert_warning('No se eliminó ningun elemento');
            }
        });
    }
    useEffect(() => {
        GetTipoTelefono();
        GetTelefonos(personaId);
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
                                        <Button variant="success" className="btn-sm btn-round has-ripple" onClick={handleOpenModal}><i className="feather icon-plus" /> Agregar teléfono</Button>
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
                                                <th>Opciones</th>
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            telefonos.map(({ telefono_personaId, cat_tipo_telefono: { descripcion: tipoTelefono }, telefono, cat_estado: { descripcion: estado } }) => (
                                                <tr key={telefono_personaId}>
                                                    <td>{telefono_personaId}</td>
                                                    <td>{tipoTelefono}</td>
                                                    <td>{telefono}</td>
                                                    <td>{estado}</td>
                                                    {
                                                        accesos.find(acceso => acceso === 3 || acceso === 4) &&
                                                        <td style={{ textAlign: "right", width: "100px" }}>
                                                            {
                                                                accesos.find(acceso => acceso === 3) &&
                                                                <button className="btn btn-info btn-sm" onClick={() => { handleEditar(telefono_personaId) }}><i className="feather icon-edit" />&nbsp;Editar </button>
                                                            }
                                                            {
                                                                accesos.find(acceso => acceso === 4) &&
                                                                <button className="btn btn-danger btn-sm" onClick={() => { handleDelete(telefono_personaId) }}><i className="feather icon-trash-2" />&nbsp;Eliminar </button>
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
                                <TelefonoUpSert abrirModal={abrirModal} setAbrirModal={setAbrirModal} catTipoTelefono={catTipoTelefono} personaId={personaId} GetTelefonos={GetTelefonos} dataInicial={dataInicial} />
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}
