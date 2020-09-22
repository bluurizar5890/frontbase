import React, { useEffect } from 'react';
import {
    Row,
    Col,
    Card,
    Button,
    Table
} from 'react-bootstrap';

import Aux from '../../../hoc/_Aux';
import $ from 'jquery';

$.DataTable = require('datatables.net-bs');
require('datatables.net-responsive-bs');

function atable() {
    let tableZero = '#data-table-zero';
    $.fn.dataTable.ext.errMode = 'throw';

    $(tableZero).DataTable();
}
export const PersonaListar = () => {
    useEffect(() => {
        atable();
    }, [])
    return (
        <Aux>
            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>
                        <Card.Body>
                            <Row className="align-items-center m-l-0">
                                <Col />
                                <Col className="text-right">
                                    <Button variant="success" className="btn-sm btn-round has-ripple"><i className="feather icon-plus" /> Nueva Persona</Button>
                                </Col>
                            </Row>
                            <Table striped hover responsive bordered id="data-table-zero">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Primer Nombre</th>
                                        <th>Segundo Nombre</th>
                                        <th>Otros Nombre</th>
                                        <th>Primer Apellido</th>
                                        <th>Segundo Apellido</th>
                                        <th>Apellido de Casa</th>
                                        <th>Fecha de Nacimiento</th>
                                        <th>Correo</th>
                                        <th>Genero</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Micheal Pewd</td>
                                        <td>doctor@example.com</td>
                                        <td>+984-46-9388638</td>
                                        <td>Micheal Pewd</td>
                                        <td>Micheal Pewd</td>
                                        <td>Micheal Pewd</td>
                                        <td>Micheal Pewd</td>
                                        <td>Micheal Pewd</td>
                                        <td>Cardiology</td>
                                        <td>
                                            <a className="btn btn-info btn-sm"><i className="feather icon-edit" />&nbsp;Editar </a>
                                            <a className="btn btn-danger btn-sm"><i className="feather icon-trash-2" />&nbsp;Eliminar </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    )
}
