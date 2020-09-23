import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Tab, Nav } from 'react-bootstrap';
import Aux from '../../hoc/_Aux'
import { PersonaRegistrar } from '../components/base/PersonaRegistrar'
import { IdentificacionListar } from '../components/base/IdentificacionListar';
import { DireccionListar } from '../components/base/DireccionListar';
import { TelefonoListar } from '../components/base/TelefonoListar';
import { DatoExtraListar } from '../components/base/DatoExtraListar';
// import { useParams } from 'react-router-dom';
const menus = [13, 14, 15, 16];
const PersonaUpSertPage = ({ match }) => {
    let { idpersona } = match.params;
    idpersona = !idpersona ? 0 : idpersona;
    const [personaId, setPersonaId] = useState(idpersona);
    const handleSetIdPersona = (id) => {
        setPersonaId(id);
    }
    return (
        <Aux>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as='h5'>
                                {
                                personaId > 0 ? 'Actualización de Información de Persona' : 'Registro de Información de Persona'
                                }
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Tab.Container defaultActiveKey="persona">
                                <Row>
                                    <Col sm={2}>
                                        <Nav variant="pills" className="flex-column">
                                            <Nav.Item>
                                                <Nav.Link eventKey="persona">Persona</Nav.Link>
                                            </Nav.Item>
                                            {
                                                menus.find(item => item === 13) &&
                                                <Nav.Item>
                                                    <Nav.Link eventKey="identificaciones" disabled={personaId <= 0 ? true : false}>Identificaciones</Nav.Link>
                                                </Nav.Item>}
                                            {
                                                menus.find(item => item === 14) &&
                                                <Nav.Item>
                                                    <Nav.Link eventKey="direcciones" disabled={personaId <= 0 ? true : false}>Direcciones</Nav.Link>
                                                </Nav.Item>}
                                            {
                                                menus.find(item => item === 15) &&
                                                <Nav.Item>
                                                    <Nav.Link eventKey="telefonos" disabled={personaId <= 0 ? true : false}>Teléfonos</Nav.Link>
                                                </Nav.Item>
                                            }
                                            {
                                                menus.find(item => item === 16) &&
                                                <Nav.Item>
                                                    <Nav.Link eventKey="datosExtra" disabled={personaId <= 0 ? true : false}>Información Adicional</Nav.Link>
                                                </Nav.Item>
                                            }
                                        </Nav>
                                    </Col>
                                    <Col sm={10}>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="persona">
                                                <PersonaRegistrar handleSetIdPersona={handleSetIdPersona} personaId={personaId} />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="identificaciones">
                                                <IdentificacionListar personaId={personaId} />

                                            </Tab.Pane>
                                            <Tab.Pane eventKey="direcciones">
                                                <DireccionListar personaId={personaId} />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="telefonos">
                                                <TelefonoListar personaId={personaId} />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="datosExtra">
                                                <DatoExtraListar personaId={personaId} />
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    )
}

export default PersonaUpSertPage;