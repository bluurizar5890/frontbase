import React, { useState } from 'react'
import Aux from '../../hoc/_Aux'
import { PersonaRegistrar } from '../components/base/PersonaRegistrar'
import { Row, Col, Card, Tab, Nav } from 'react-bootstrap';
const PersonaPage = () => {
    const [idPersona, setIdPersona] = useState(0);

    const handleSetIdPersona = (id) => {
        console.log(id);
        setIdPersona(id);
    }

    return (
        <Aux>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as='h5'>Registro de Información de Persona</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Tab.Container defaultActiveKey="persona">
                                <Row>
                                    <Col sm={2}>
                                        <Nav variant="pills" className="flex-column">
                                            <Nav.Item>
                                                <Nav.Link eventKey="persona">Persona</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="identificaciones" disabled={idPersona <= 0 ? true : false}>Identificaciones</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="direcciones" disabled={idPersona <= 0 ? true : false}>Direcciones</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="telefonos" disabled={idPersona <= 0 ? true : false}>Teléfonos</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Col>
                                    <Col sm={10}>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="persona">
                                                <PersonaRegistrar handleSetIdPersona={handleSetIdPersona} />
                                                {/* <RegistrarPersona/> */}
                                                {/* <RegistrarPersona
                                                        onChange={this.handleChange}
                                                        persona={this.state.persona}
                                                        onSubmit={this.handleSubmitPerson}
                                                        onError={this.handleErrorSubmit}
                                                        errorMessage={errorMessage}
                                                    /> */}
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="identificaciones">
                                                {/* <DocumentoIden onSubmit={this.handleSubmitPerson}
                                                        onError={this.handleErrorSubmit} 
                                                        open={true}/> */}
                                                {/* <RegistrarIdentificacion
                                                        personaId={this.state.persona.personaId}
                                                    />  */}

                                            </Tab.Pane>
                                            <Tab.Pane eventKey="direcciones">
                                                {/* <RegistrarDireccion
                                                        onSubmit={this.handleSubmitAddress}
                                                        onError={this.handleErrorSubmit}
                                                        errorMessage={errorMessage}
                                                        
                                                    /> */}
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="telefonos">
                                                {/* <TabsPills></TabsPills> */}
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

export default PersonaPage;