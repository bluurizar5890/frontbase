import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Form, Modal, Button, Table } from 'react-bootstrap';
import { ValidationForm, TextInput, SelectGroup } from 'react-bootstrap4-form-validation';
import callApi from '../../../helpers/conectorApi';
import Aux from '../../../hoc/_Aux';
import { IdentificacionRegistrar } from './IdentificacionRegistrar';
export const IdentificacionListar = ({ personaId }) => {
    const [abrirModal, setAbrirModal] = useState(false);
    const [catTipoDocumento, setCatTipoDocumento] = useState([]);
    const handleOpenModal = () => {
        setAbrirModal(true);
    }

    const GetTiposIdentificaciones = async () => {
        let response = await callApi('tipodocumento?estadoId=1');
        setCatTipoDocumento(response);
    }
    console.log(personaId);
    useEffect(async () => {
        GetTiposIdentificaciones();
    }, [personaId])
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
                                    <Button variant="success" className="btn-sm btn-round has-ripple" onClick={handleOpenModal}><i className="feather icon-plus" /> Agregar documento</Button>
                                </Col>
                            </Row>
                            <Table striped hover responsive bordered id="table_dentificaciones_persona">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Tipo</th>
                                        <th>Número</th>
                                        <th>Estado</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Dpi</td>
                                        <td>2113422541504</td>
                                        <td>Activo</td>
                                        <td>Editar</td>
                                    </tr>
                                </tbody>
                            </Table>
                            {
                                abrirModal === true &&
                                <IdentificacionRegistrar abrirModal={abrirModal} setAbrirModal={setAbrirModal} catTipoDocumento={catTipoDocumento} personaId={personaId} />
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}
