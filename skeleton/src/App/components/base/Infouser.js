
import React, { useState } from 'react'
import { Card, Col, Modal, Row } from 'react-bootstrap'
import moment from 'moment';
import Aux from '../../../hoc/_Aux'
import avatar4 from '../../../assets/images/user/avatar-4.jpg';
import { useSelector } from 'react-redux';
import ActualizacionContrasenia from './ActualizacionContrasenia';
export const Infouser = () => {
    const { userInfo } = useSelector(state => state);
    const [abrirModal, setAbrirModal] = useState(false);
    const bufferBase64 = new Buffer(userInfo.imagen.foto.data,"binary").toString("base64");
    console.log("Información de usuario", userInfo);
    return (
        <Aux>
            <Row>

                <Col xl={12} md={12}>
                    <br></br>
                    <br></br>
                    {
                        userInfo &&
                        <Card className="user-card-full">
                            <Row className="m-l-0 m-r-0">
                                <Col sm={4} className="bg-c-blue user-profile-side">
                                    <Card.Body className="text-center text-white">
                                        <div className="m-b-25">
                                            {/* <img src={avatar4} className="img-radius" alt="User-Profile" /> */}
                                            <img src={"data:image/jpeg;base64," + bufferBase64} className="img-radius" alt="User-Profile" />
                                        </div>
                                        <h6 className="f-w-600 text-white">{userInfo.user_name}</h6>
                                        {/* <p>Web Designer</p> */}
                                        <a href="#" className="text-white" onClick={() => { setAbrirModal(!abrirModal) }}>Cambiar Contraseña<i className="feather icon-edit m-t-10 f-16" /></a>
                                    </Card.Body>
                                </Col>
                                <Col sm={8}>
                                    <Card.Body>
                                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                        <Row>
                                            <Col>
                                                <p className="m-b-10 f-w-600">Nombre</p>
                                                <h6 className="text-muted f-w-400">{userInfo.nombre}</h6>
                                            </Col>
                                            <Col>
                                                <p className="m-b-10 f-w-600">Fecha de Nacimiento</p>
                                                <h6 className="text-muted f-w-400">{moment(userInfo.fecha_nacimiento).format('DD/MM/YYYY')}</h6>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <p className="m-b-10 f-w-600">Fecha de Vencimiento de Contraseña</p>
                                                <h6 className="text-muted f-w-400">{moment(userInfo.fecha_cambio_password).format('DD/MM/YYYY')}</h6>
                                            </Col>
                                            <Col>
                                                <p className="m-b-10 f-w-600">Correo</p>
                                                <h6 className="text-muted f-w-400"><a href={`mailto:${userInfo.email}?Subject=Buen%20día`} target="_top">{userInfo.email}</a> </h6>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <p className="m-b-10 f-w-600">Fecha de Ingreso</p>
                                                <h6 className="text-muted f-w-400">{moment(userInfo.fecha_crea).format('DD/MM/YYYY')}</h6>
                                            </Col>
                                            <Col>
                                                <p className="m-b-10 f-w-600">Género</p>
                                                <h6 className="text-muted f-w-400">{userInfo.genero === 1 ? 'MASCULINO' : 'FEMENINO'}</h6>
                                            </Col>
                                        </Row>
                                        <h6 className="m-b-20 m-t-50 p-b-5 b-b-default f-w-600">Perfiles</h6>
                                        <Row>
                                            <Col>
                                                {
                                                    userInfo.perfiles.map(({ rolId, nombre }) => (
                                                        <h6 key={rolId} className="text-muted f-w-400">{nombre}</h6>
                                                    ))
                                                }
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    }
                </Col>
            </Row>
            {
                abrirModal &&
                <Modal show={abrirModal} onHide={() => setAbrirModal(false)}>
                    <Modal.Header closeButton>
                        {/* <Modal.Title as="h5">Información</Modal.Title> */}
                    </Modal.Header>
                    <Modal.Body>
                        <ActualizacionContrasenia inModal={true} setAbrirModal={setAbrirModal} />
                    </Modal.Body>
                </Modal>
            }
        </Aux>
    )
}
