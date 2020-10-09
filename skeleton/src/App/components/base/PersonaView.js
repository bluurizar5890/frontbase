import React, { useEffect, useState } from 'react'
import { Col, Modal, Row, Tab, Nav } from 'react-bootstrap';
import moment from 'moment';
import callApi from '../../../helpers/conectorApi';
import '../../../assets/scss/estilo-personalizado.css';
export const PersonaView = ({ abrirModal, setAbrirModal, personaId }) => {
    const [infoPersona, setInfoPersona] = useState([])
    const GetInfoPersona = async (id) => {
        let response = await callApi(`persona?id=${id}`);
        setInfoPersona(response);
    }
    console.log("Info persona en get",infoPersona);
    const listIdentificaciones=()=>{
        let {identificacion_personas}=infoPersona;
        if(identificacion_personas){
            return identificacion_personas;
        }else{
            return [];
        }
    }
    useEffect(() => {
        GetInfoPersona(personaId);
    }, [personaId]);
    return (
        <Modal show={abrirModal} onHide={() => setAbrirModal(false)} size="lg">
            <Modal.Header closeButton>
                <Modal.Title as="h5">Información</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tab.Container defaultActiveKey="datosPersonales">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="datosPersonales">Datos Personales</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="identificaciones">Identificaciones</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="direcciones">Direcciones</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="telefonos">Teléfonos</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="dataExtra">Información adicional</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="datosPersonales">
                                    <table className="table table-striped table-bordered table-hover">
                                        {
                                            infoPersona.map((item) => {
                                                const { nombre1,
                                                    nombre2,
                                                    nombre_otros,
                                                    apellido1,
                                                    apellido2,
                                                    apellido_casada,
                                                    fecha_nacimiento,
                                                    email,
                                                    // Estado: { descripcion: estado },
                                                    cat_genero: { descripcion: genero }
                                                } = item;
                                                return (
                                                    <tbody key={personaId}>
                                                        <tr>
                                                            <th>Primer Nombre</th>
                                                            <td>{nombre1}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Segundo Nombre</th>
                                                            <td>{nombre2}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Otros Nombres</th>
                                                            <td>{nombre_otros}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Primer Apellido</th>
                                                            <td>{apellido1}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Segundo Apellido</th>
                                                            <td>{apellido2}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Apellido de casada</th>
                                                            <td>{apellido_casada}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Fecha de Nacimiento</th>
                                                            <td>{moment(fecha_nacimiento).format('DD/MM/YYYY')}</td>
                                                        </tr>

                                                        <tr>
                                                            <th>Género</th>
                                                            <td>{genero}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Correo</th>
                                                            <td>{email}</td>
                                                        </tr>
                                                    </tbody>
                                                )
                                            })
                                        }

                                    </table>

                                </Tab.Pane>
                                <Tab.Pane eventKey="identificaciones">
                                    <table>
                                        <thead>
                                            <th>Código</th>
                                            <th>Tipo</th>
                                            <th>Número</th>
                                            <th>Estado</th>
                                        </thead>
                                        <tbody>
                                            {
                                                listIdentificaciones().map(({ identificacion_personaId, numero_identificacion, TipoDocumento: { descripcion: tipoIdentificacion }, Estado: { descripcion: estado } }) => (
                                                    <tr key={`identificacion${identificacion_personaId}`}>
                                                        <td>{identificacion_personaId}</td>
                                                        <td>{tipoIdentificacion}</td>
                                                        <td>{numero_identificacion}</td>
                                                        <td>{estado}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </Tab.Pane>
                                <Tab.Pane eventKey="direcciones">
                                    <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you probably haven't heard of them, vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth chambray yr.</p>
                                </Tab.Pane>
                                <Tab.Pane eventKey="telefonos">
                                    <p>Eu dolore ea ullamco dolore Lorem id cupidatat excepteur reprehenderit consectetur elit id dolor proident in cupidatat officia. Voluptate excepteur commodo labore nisi cillum duis aliqua do. Aliqua amet qui mollit consectetur nulla mollit velit aliqua veniam nisi id do Lorem deserunt amet. Culpa ullamco sit adipisicing labore officia magna elit nisi in aute tempor commodo eiusmod.</p>
                                </Tab.Pane>
                                <Tab.Pane eventKey="dataExtra">
                                    <p>Eu dolore ea ullamco dolore Lorem id cupidatat excepteur reprehenderit consectetur elit id dolor proident in cupidatat officia. Voluptate excepteur commodo labore nisi cillum duis aliqua do. Aliqua amet qui mollit consectetur nulla mollit velit aliqua veniam nisi id do Lorem deserunt amet. Culpa ullamco sit adipisicing labore officia magna elit nisi in aute tempor commodo eiusmod.</p>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Modal.Body>
        </Modal>
    )
}
