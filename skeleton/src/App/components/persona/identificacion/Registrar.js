//https://material-table.com/#/docs/features/editable
// https://medium.com/better-programming/how-to-add-form-validation-to-your-react-app-e19f076e6c10
import React from 'react';
import DatePicker from "react-datepicker";
import { Row, Col, Card, Form, Modal, Button, Table } from 'react-bootstrap';
import { ValidationForm, TextInput, SelectGroup } from 'react-bootstrap4-form-validation';
import validator from 'validator';
import callApi from '../../../service/conectorApi';
import Notificacion from '../../../service/alerts';

import Aux from "./../../../../hoc/_Aux";
import $ from 'jquery';

import DEMO from "../../../../store/constant";
import { useState } from 'react';

const errorMessage = "Este campo es requerido";

const NuevoDocumento = (props) => {
    return (
        <ValidationForm onSubmit={props.onSubmit} onErrorSubmit={props.onErrorSubmit}>
            <Form.Row>
                <Form.Group as={Col} md="12">
                    <Form.Label htmlFor="tipo_documentoId">Tipo Identificación</Form.Label>
                    <SelectGroup
                        name="tipo_documentoId"
                        id="tipo_documentoId"
                        required
                        errorMessage={errorMessage}>
                        <option value="">Seleccione un tipo de identificación</option>
                        {
                            props.TipoDocto.map(item => {
                                return (
                                    <option value={item.tipo_documentoId} key={item.tipo_documentoId}>{item.descripcion}</option>
                                )
                            })
                        }
                    </SelectGroup>
                </Form.Group>

                <Form.Group as={Col} md="12">
                    <Form.Label htmlFor="numero_identificacion">Número de Identificación</Form.Label>
                    <TextInput
                        name="numero_identificacion"
                        id="numero_identificacion"
                        required
                        errorMessage={errorMessage}
                        placeholder="Número de identificación"
                        autoComplete="off"
                    />
                </Form.Group>
                <div className="col-sm-3"></div>
                <div className="col-sm-3">
                    <button type="button" onClick={props.onCloseModal} className="btn btn-warning"> Cancelar</button>
                </div>
                <div className="col-sm-3">
                    <button type="submit" className="btn btn-success"> Registrar</button>
                </div>
            </Form.Row>
        </ValidationForm>
    );
}

const ActualizarDocumento = (props) => {
    const [DoctoPersona,setDoctoPersona]=useState([]);

    setDoctoPersona(
        {
            identificacion_personaId:props.Datos.identificacion_personaId,
            tipo_documentoId:props.Datos.tipo_documentoId,
            numero_identificacion:props.Datos.numero_identificacion,
            estadoId:props.Datos.estadoId

        }
    );


    return (
        <ValidationForm onSubmit={props.onSubmitUpdate} onErrorSubmit={props.onErrorSubmit}>
        <TextInput hidden name="identificacion_personaId" id="identificacion_personaId" value={DoctoPersona.identificacion_personaId}/>
            <Form.Row>
                <Form.Group as={Col} md="12">
                    <Form.Label htmlFor="tipo_documentoId">Tipo Identificación</Form.Label>
                    <SelectGroup
                        name="tipo_documentoId"
                        id="tipo_documentoId"
                        required
                        value={DoctoPersona.tipo_documentoId}
                        onChange={props.onChangeUpdate}
                        errorMessage={errorMessage}>
                        <option value="">Seleccione un tipo de identificación</option>
                        {
                            props.TipoDocto.map(item => {
                                return (
                                    <option value={item.tipo_documentoId} key={item.tipo_documentoId}>{item.descripcion}</option>
                                )
                            })
                        }
                    </SelectGroup>
                </Form.Group>

                <Form.Group as={Col} md="12">
                    <Form.Label htmlFor="numero_identificacion">Número de Identificación</Form.Label>
                    <TextInput
                        name="numero_identificacion"
                        id="numero_identificacion"
                        required
                        value={DoctoPersona.numero_identificacion}
                        onChange={props.onChangeUpdate}
                        errorMessage={errorMessage}
                        placeholder="Número de identificación"
                        autoComplete="off"
                    />
                </Form.Group>
                <Form.Group as={Col} md="12">
                    <Form.Label htmlFor="estadoId">Estado</Form.Label>
                    <SelectGroup
                        name="estadoId"
                        id="estadoId"
                        required
                        value={DoctoPersona.estadoId}
                        onChange={props.onChangeUpdate}
                        errorMessage={errorMessage}>
                        <option value="">Seleccione un estado</option>
                        {
                            props.Estados.map(item => {
                                return (
                                    <option value={item.estadoId} key={item.estadoId}>{item.descripcion}</option>
                                )
                            })
                        }
                    </SelectGroup>
                </Form.Group>

                <div className="col-sm-3"></div>
                <div className="col-sm-3">
                    <button type="button" onClick={props.onCloseModal} className="btn btn-warning"> Cancelar</button>
                </div>
                <div className="col-sm-3">
                    <button type="submit" className="btn btn-success"> Registrar</button>
                </div>
            </Form.Row>
        </ValidationForm>
    );
}

class ListadoIdentificaciones extends React.Component {
    state = {
        modalIsOpen: false,
        Datos: {}
    };

    handleOpenModal = e => {
        console.log("Abrir modal", e);
        this.setState({ modalIsOpen: true });
    }

    handleOpenModalEdit = (e) => {
        console.log("e", e);
        this.setState({ modalIsOpen: true });
    }
    handleCloseModal = e => {
        this.setState({ modalIsOpen: false });
    }

    handleSubmit = async (e, datosFormulario, inputs) => {
        e.preventDefault();
        console.log("Datos Identificación", datosFormulario);
        datosFormulario.personaId = this.props.personaId;
        let method = 'POST';

        let response = await callApi('/persona/identificacion', {
            method,
            body: JSON.stringify(datosFormulario)
        });

        const { error, body } = response;
        const { code, data } = body;
        if (error) {
            Notificacion.error(body);
        } else {
            if (code === 0) {
                console.log("Data", data);
                this.getIdentificaciones();
                Notificacion.success("Documento de identifiación agregado exitosamente");
            } else {
                Notificacion.error(data);
            }
        }
        this.setState({ modalIsOpen: false });

    };

    handleErrorSubmit = (e, formData, errorInputs) => {
        console.log("Errores", errorInputs);
    };

    editContact = (contact) => {
        console.log("d", contact);
        this.setState({ Datos: contact, modalIsOpen: true })
    }
    render() {
        return (
            <div>
                <Table ref="tbl" striped hover responsive bordered id="table_dentificaciones_persona">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Tipo</th>
                            <th>Número</th>
                            <th>Estado</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.data.map((item) => {
                                return (
                                    <tr key={item.identificacion_personaId} id={item.identificacion_personaId}>
                                        <td>{item.identificacion_personaId}</td>
                                        <td>{item.cat_tipo_documento.descripcion}</td>
                                        <td>{item.numero_identificacion}</td>
                                        <td>{item.cat_estado.descripcion}</td>
                                        <td>
                                            <a onClick={this.editContact.bind(this, item)} className="btn btn-info btn-sm"><i className="feather icon-edit" />&nbsp;Editar </a>
                                            <a href={DEMO.BLANK_LINK} className="btn btn-danger btn-sm"><i className="feather icon-trash-2" />&nbsp;Eliminar </a>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </Table>

                <Modal show={this.state.modalIsOpen} onHide={() => this.setState({ modalIsOpen: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title as="h5">Actualizar documento</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ActualizarDocumento onSubmitUpdate={this.props.handleUpdate}
                            onErrorSubmit={this.handleErrorSubmit}
                            TipoDocto={this.props.TipoDocto}
                            onCloseModal={this.handleCloseModal}
                            onOpenModal={this.handleOpenModal}
                            modalIsOpen={this.state.modalIsOpen}
                            Estados={this.props.Estados}
                            Datos={this.state.Datos}
                            onChangeUpdate={this.props.onChangeUpdate}
                        />
                    </Modal.Body>
                </Modal>

            </div>
        );
    }
}

class RegistrarIdentificacion extends React.Component {
    state = {
        TipoDocto: [],
        Identificaciones: [],
        modalIsOpen: false,
        Estados: []
    };

    handleOpenModal = e => {
        console.log("Abrir modal", e);
        this.setState({ modalIsOpen: true });
    }

    handleOpenModalEdit = (e) => {
        console.log("e", e);
        this.setState({ modalIsOpen: true });
    }
    handleCloseModal = e => {
        this.setState({ modalIsOpen: false });
    }

    componentDidMount() {
        this.getTipoIdentificacion();
        this.getIdentificaciones();
        this.getEstados();
    }

    handleUpdate = async (e, datosFormulario, inputs) => {
        e.preventDefault();
        console.log({datosFormulario});
    }

    getTipoIdentificacion = async () => {
        let response = await callApi('/tipodocumento?estadoId=1', {
            method: 'GET'
        });
        const { error, body } = response;
        const { code, data } = body;
        if (error) {
            Notificacion.error(body);
        } else {
            if (code === 0) {
                this.setState({
                    TipoDocto: data
                });
            } else {
                Notificacion.error(data);
            }
        }

    }
    getIdentificaciones = async () => {
        let response = await callApi(`/persona/identificacion?personaId=${this.props.personaId}&estadoId=1;2`, {
            method: 'GET'
        });
        const { error, body } = response;
        const { code, data } = body;
        if (error) {
            Notificacion.error(body);
        } else {
            if (code === 0) {
                this.setState({
                    Identificaciones: data
                });
            } else {
                Notificacion.error(data);
            }
        }

    }
    getEstados = async () => {
        let response = await callApi(`/estado`, {
            method: 'GET'
        });
        const { error, body } = response;
        const { code, data } = body;
        if (error) {
            Notificacion.error(body);
        } else {
            if (code === 0) {
                this.setState({
                    Estados: data
                });
            } else {
                Notificacion.error(data);
            }
        }

    }


    handleSubmit = async (e, datosFormulario, inputs) => {
        e.preventDefault();
        console.log("Datos Identificación", datosFormulario);
        datosFormulario.personaId = this.props.personaId;
        let method = 'POST';

        let response = await callApi('/persona/identificacion', {
            method,
            body: JSON.stringify(datosFormulario)
        });

        const { error, body } = response;
        const { code, data } = body;
        if (error) {
            Notificacion.error(body);
        } else {
            if (code === 0) {
                console.log("Data", data);
                this.getIdentificaciones();
                Notificacion.success("Documento de identifiación agregado exitosamente");
            } else {
                Notificacion.error(data);
            }
        }
        this.setState({ modalIsOpen: false });

    };

    handleErrorSubmit = (e, formData, errorInputs) => {
        console.log("Errores", errorInputs);
    };
    onChangeUpdate=e=>{
        console.log("Datos formulario",e);
    }
    render() {
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
                                        <Button variant="success" className="btn-sm btn-round has-ripple" onClick={() => this.setState({ modalIsOpen: true })}><i className="feather icon-plus" /> Agregar documento</Button>
                                    </Col>
                                </Row>
                                <ListadoIdentificaciones onChangeUpdate={this.onChangeUpdate} handleUpdate={this.handleUpdate} data={this.state.Identificaciones} OpenModal={this.handleOpenModalEdit} Estados={this.state.Estados} TipoDocto={this.state.TipoDocto}></ListadoIdentificaciones>
                            </Card.Body>
                        </Card>
                        <Modal show={this.state.modalIsOpen} onHide={() => this.setState({ modalIsOpen: false })}>
                            <Modal.Header closeButton>
                                <Modal.Title as="h5">Nuevo Documento</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <NuevoDocumento onSubmit={this.handleSubmit}
                                    onErrorSubmit={this.handleErrorSubmit}
                                    TipoDocto={this.state.TipoDocto}
                                    onCloseModal={this.handleCloseModal}
                                    onOpenModal={this.handleOpenModal}
                                    modalIsOpen={this.state.modalIsOpen}
                                />
                            </Modal.Body>
                        </Modal>
                    </Col>
                </Row>
            </Aux>
        );
    }
}



export default RegistrarIdentificacion;