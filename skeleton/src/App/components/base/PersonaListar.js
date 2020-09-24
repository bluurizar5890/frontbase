import React, { useEffect, useState } from 'react';
import {
    Row,
    Col,
    Card,
    Table
} from 'react-bootstrap';

import Aux from '../../../hoc/_Aux';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import callApi from '../../../helpers/conectorApi';
import moment from 'moment';
import { PersonaView } from './PersonaView';

$.DataTable = require('datatables.net-bs');
require('datatables.net-responsive-bs');

function atable() {
    // $("#data-table-zero").DataTable().destroy();
    let tableZero = '#data-table-zero';
    $.fn.dataTable.ext.errMode = 'throw';
    $(tableZero).DataTable();
}
export const PersonaListar = () => {

    const [abrirModal, setAbrirModal] = useState(false);
    const [personas, setPersonas] = useState([]);
    const [personaId, setPersonaId] = useState(0);

    const GetPersonas = async () => {
        let response = await callApi(`persona?&estadoId=1;2`);
        setPersonas(response);
    }
    useEffect(() => {
        console.log("use efect");
        GetPersonas();
    }, []);

    const handleVerDetalle = (id) => {
        setAbrirModal(true);
        setPersonaId(id);
        console.log("Id persona seleccionada",id);
    }


    // useLayoutEffect(() => {
    //     atable();
    //     console.log("uselayoutefect");
    // }, [personas])
    return (
        <Aux>
            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>
                        <Card.Body>
                            <Row className="align-items-center m-l-0">
                                <Col />
                                <Col className="text-right">
                                    <Link variant="success" className="btn-sm btn-round has-ripple" to="/personaupsert"><i className="feather icon-plus" /> Nueva Persona</Link>
                                </Col>
                            </Row>
                            <Table striped hover responsive bordered id="data-table-zero">
                                <thead>
                                    <tr>
                                        <th>Ver</th>
                                        <th>Nombre</th>
                                        <th>Fecha de Nacimiento</th>
                                        <th>Correo</th>
                                        <th>Genero</th>
                                        <th>Estado</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        personas.map((item) => {
                                            const { personaId,
                                                nombre1,
                                                nombre2,
                                                nombre_otros,
                                                apellido1,
                                                apellido2,
                                                apellido_casada,
                                                email,
                                                fecha_nacimiento, cat_genero: { descripcion: genero }, cat_estado: { descripcion: estado } } = item;
                                            let nombreCompleto = nombre1;
                                            if (nombre2) {
                                                nombreCompleto += " " + nombre2;
                                            }
                                            if (nombre_otros) {
                                                nombreCompleto += " " + nombre_otros;
                                            }
                                            nombreCompleto += " " + apellido1;

                                            if (apellido2) {
                                                nombreCompleto += " " + apellido2;
                                            }
                                            if (apellido_casada) {
                                                nombreCompleto += " " + apellido_casada;
                                            }
                                            return (
                                                <tr key={personaId}>
                                                    <td><button className="btn-icon btn btn-outline-primary btn-sm" onClick={()=>{handleVerDetalle(personaId)}}><i className="feather icon-eye" /></button></td>
                                                    <td>{nombreCompleto}</td>
                                                    <td>{moment(fecha_nacimiento).format('DD/MM/YYYY')}</td>
                                                    <td>{email}</td>
                                                    <td>{genero}</td>
                                                    <td>{estado}</td>
                                                    <td style={{ textAlign: "right", width: "100px" }}>
                                                        <Link className="btn-icon btn btn-info btn-sm" to={`/personaupsert/${item.personaId}`}><i className="feather icon-edit" /></Link>
                                                        <button className="btn-icon btn btn-danger btn-sm"><i className="feather icon-trash-2" /></button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </Card.Body>
                        {
                            abrirModal &&
                            <PersonaView abrirModal={abrirModal} setAbrirModal={setAbrirModal} personaId={personaId} />
                        }
                    </Card>
                </Col>
            </Row>
        </Aux>

    )
}