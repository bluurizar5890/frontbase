import React, { useEffect, useState } from 'react';
import {
    Row,
    Col,
    Card,
    Table
} from 'react-bootstrap';

import Aux from '../../../hoc/_Aux';
import { Link } from 'react-router-dom';
import callApi from '../../../helpers/conectorApi';
import moment from 'moment';
import { PersonaView } from './PersonaView';
import { limpiarEstiloTabla,asignarEstiloTabla } from '../../../helpers/estiloTabla';
export const PersonaListar = () => {

    const [abrirModal, setAbrirModal] = useState(false);
    const [personas, setPersonas] = useState([]);
    const [personaId, setPersonaId] = useState(0);

    const GetPersonas = async () => {
        let response = await callApi(`persona?&estadoId=1;2`);
        limpiarEstiloTabla("#mytable");
        setPersonas(response);
        asignarEstiloTabla("#mytable");
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
   
    return (
        <Aux>
            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>
                        <Card.Body>
                            <Row className="align-items-center m-l-0">
                                <Col />
                                <Col className="text-right">
                                    <Link variant="success" className="btn-sm btn-round has-ripple" to="/catalogo/personaupsert"><i className="feather icon-plus" /> Nueva Persona</Link>
                                </Col>
                            </Row>
                            <Table striped hover responsive bordered id="mytable">
                                <thead>
                                    <tr>
                                        {/* <th>Ver</th> */}
                                        <th>Codigo</th>
                                        <th>Nombre</th>
                                        <th>Fecha de Nacimiento</th>
                                        <th>Correo</th>
                                        <th>Genero</th>
                                        <th>Estado</th>
                                        <th></th>
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
                                                    {/* <td><button className="btn-icon btn btn-outline-primary btn-sm" onClick={()=>{handleVerDetalle(personaId)}}><i className="feather icon-eye" /></button></td> */}
                                                    <td>{personaId}</td>
                                                    <td>{nombreCompleto}</td>
                                                    <td>{moment(fecha_nacimiento).format('DD/MM/YYYY')}</td>
                                                    <td>{email}</td>
                                                    <td>{genero}</td>
                                                    <td>{estado}</td>
                                                    <td style={{ textAlign: "center", width: "100px" }}>
                                                        <Link className="btn-icon btn btn-info btn-sm" to={`/catalogo/personaupsert/${item.personaId}`}><i className="feather icon-edit" /></Link>
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