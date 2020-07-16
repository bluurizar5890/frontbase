//https://material-table.com/#/docs/features/editable
// https://medium.com/better-programming/how-to-add-form-validation-to-your-react-app-e19f076e6c10
import React from 'react';
import { Row, Col, Card, Form, Modal, Button, Table } from 'react-bootstrap';
import { ValidationForm, TextInput, SelectGroup } from 'react-bootstrap4-form-validation';
import callApi from '../../../service/conectorApi';
import Notificacion from '../../../service/alerts';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Aux from "./../../../../hoc/_Aux";
import { useState } from 'react';

const errorMessage = "Este campo es requerido";
const useDocumentoPersona=(data)=>{
    const [values, setValues] = useState(data);
    const onChangeHandler = (e) => {
        setValues({
                    ...values,
                    [e.target.name]: e.target.value
                });
    }
    return {values,onChangeHandler}
}

const NuevoDocumento = (props) => {

    const {values,onChangeHandler}=useDocumentoPersona(
        {
            personaId: props.personaId,
            tipo_documentoId:"",
            numero_identificacion:""
        }
    );

    const handleSubmit = async (e, datosFormulario, inputs) => {
        e.preventDefault();
        let method = 'POST';
        let response = await callApi('/persona/identificacion', {
            method,
            body: JSON.stringify(values)
        });

        const { error, body } = response;
        const { code, data } = body;
        if (error) {
            Notificacion.error(body);
        } else {
            if (code === 0) {
                props.getIdentificaciones();
                Notificacion.success("Documento de identifiación agregado exitosamente");
            } else {
                Notificacion.error(data);
            }
        }
    };


    return (
        <ValidationForm onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} md="12">
                    <Form.Label htmlFor="tipo_documentoId">Tipo Identificación</Form.Label>
                    <SelectGroup
                        name="tipo_documentoId"
                        id="tipo_documentoId"
                        required
                        value={values.tipo_documentoId}
                        onChange={onChangeHandler}
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
                        value={values.numero_identificacion}
                        onChange={onChangeHandler}
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
    const {values,onChangeHandler}=useDocumentoPersona(
        {
            identificacion_personaId: props.Datos.identificacion_personaId,
            tipo_documentoId: props.Datos.tipo_documentoId,
            numero_identificacion: props.Datos.numero_identificacion,
            estadoId: props.Datos.estadoId
        }
    );

    const Update =async (e, datosFormulario, inputs) => {
        e.preventDefault();
        let method = 'PUT';
        let response = await callApi('/persona/identificacion', {
            method,
            body: JSON.stringify(values)
        });

        const { error, body } = response;
        const { code, data } = body;
        if (error) {
            Notificacion.error(body);
        } else {
            if (code === 0) {
                Notificacion.success(data);
            } else {
                Notificacion.error(data);
            }
        }
        props.actualizarTabla();
        props.onCloseModal();
    }

    return (

        <ValidationForm onSubmit={Update} onErrorSubmit={props.onErrorSubmit}>
            <Form.Row>
                <Form.Group as={Col} md="12">
                    <Form.Label htmlFor="tipo_documentoId">Tipo Identificación</Form.Label>
                    <SelectGroup
                        name="tipo_documentoId"
                        id="tipo_documentoId"
                        required
                        value={values.tipo_documentoId}
                        onChange={onChangeHandler}
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
                        value={values.numero_identificacion}
                        onChange={onChangeHandler}
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
                        value={values.estadoId}
                        onChange={onChangeHandler}
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
                    <button type="submit" className="btn btn-success"> Actualizar</button>
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

    handleCloseModal = e => {
        this.setState({ modalIsOpen: false });
    }

    handleErrorSubmit = (e, formData, errorInputs) => {
        console.log("Errores", errorInputs);
    };

    editar = (item) => {
        this.setState({ Datos: item, modalIsOpen: true })
    }
    eliminar = (item) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: 'Alerta?',
            text: 'Esta seguro que desea eliminar el elemento',
            type: 'warning',
            showCloseButton: true,
            showCancelButton: true
        }).then(async(willDelete) => {
            if (willDelete.value) {
                let method = 'DELETE';
                let response = await callApi(`/persona/identificacion/${item.identificacion_personaId}`, {
                    method
                });
        
                const { error, body } = response;
                const { code, data } = body;
                if (error) {
                    Notificacion.error(body);
                } else {
                    if (code === 0) {
                        Notificacion.success(data);
                        this.props.actualizarTabla();
                    } else {
                        Notificacion.error(data);
                    }
                }
            } else {
                Notificacion.info('No se eliminó ningun elemento');
            }
        });

    }
    render() {
        return (
            <div>
                <Table ref="tbl" striped hover responsive bordered id="table_dentificaciones_persona">
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
                        {
                            this.props.data.map((item,i) => {
                                return (
                                    <tr key={item.identificacion_personaId} id={item.identificacion_personaId}>
                                        <td>{i+1}</td>
                                        <td>{item.cat_tipo_documento.descripcion}</td>
                                        <td>{item.numero_identificacion}</td>
                                        <td>{item.cat_estado.descripcion}</td>
                                        <td>
                                            <a onClick={this.editar.bind(this, item)} className="btn btn-info btn-sm"><i className="feather icon-edit" />&nbsp;Editar </a>
                                            <a onClick={this.eliminar.bind(this,item)} className="btn btn-danger btn-sm"><i className="feather icon-trash-2" />&nbsp;Eliminar </a>
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
                        <ActualizarDocumento
                            TipoDocto={this.props.TipoDocto}
                            onCloseModal={this.handleCloseModal}
                            Estados={this.props.Estados}
                            Datos={this.state.Datos}
                            actualizarTabla={this.props.actualizarTabla}
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
    actualizarTabla=(e)=>{
        this.getIdentificaciones();
    }

    handleGetTodos(e){
        this.getIdentificaciones();
        this.setState({ modalIsOpen: false });
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
        this.setState({ modalIsOpen: false });
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

/*
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
                this.getIdentificaciones();
                Notificacion.success("Documento de identifiación agregado exitosamente");
            } else {
                Notificacion.error(data);
            }
        }
        this.setState({ modalIsOpen: false });

    };
    */
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
                                <ListadoIdentificaciones data={this.state.Identificaciones} actualizarTabla={this.actualizarTabla} Estados={this.state.Estados} TipoDocto={this.state.TipoDocto}></ListadoIdentificaciones>
                            </Card.Body>
                        </Card>
                        <Modal show={this.state.modalIsOpen} onHide={() => this.setState({ modalIsOpen: false })}>
                            <Modal.Header closeButton>
                                <Modal.Title as="h5">Nuevo Documento</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <NuevoDocumento getIdentificaciones={this.getIdentificaciones}
                                    TipoDocto={this.state.TipoDocto}
                                    onCloseModal={this.handleCloseModal}
                                    onOpenModal={this.handleOpenModal}
                                    modalIsOpen={this.state.modalIsOpen}
                                    personaId={this.props.personaId}
                                />
                            </Modal.Body>
                        </Modal>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

class Identificaciones extends React.Component {
    state = {
        TipoDocto: [],
        Identificaciones: [],
        modalIsOpen: false,
        Estados: []
    };

    handleOpenModal = e => {
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
    actualizarTabla=(e)=>{
        this.getIdentificaciones();
    }

    handleGetTodos(e){
        this.getIdentificaciones();
        this.setState({ modalIsOpen: false });
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
        this.setState({ modalIsOpen: false });
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

    editar = (item) => {
        this.setState({ Datos: item, modalIsOpen: true })
    }
    eliminar = (item) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: 'Alerta?',
            text: 'Esta seguro que desea eliminar el elemento',
            type: 'warning',
            showCloseButton: true,
            showCancelButton: true
        }).then(async(willDelete) => {
            if (willDelete.value) {
                let method = 'DELETE';
                let response = await callApi(`/persona/identificacion/${item.identificacion_personaId}`, {
                    method
                });
        
                const { error, body } = response;
                const { code, data } = body;
                if (error) {
                    Notificacion.error(body);
                } else {
                    if (code === 0) {
                        Notificacion.success(data);
                        this.props.actualizarTabla();
                    } else {
                        Notificacion.error(data);
                    }
                }
            } else {
                Notificacion.info('No se eliminó ningun elemento');
            }
        });

    }
    
    render() {
        return (
            <div>
                <Table ref="tbl" striped hover responsive bordered id="table_dentificaciones_persona">
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
                        {
                            this.props.data.map((item,i) => {
                                return (
                                    <tr key={item.identificacion_personaId} id={item.identificacion_personaId}>
                                        <td>{i+1}</td>
                                        <td>{item.cat_tipo_documento.descripcion}</td>
                                        <td>{item.numero_identificacion}</td>
                                        <td>{item.cat_estado.descripcion}</td>
                                        <td>
                                            <a onClick={this.editar.bind(this, item)} className="btn btn-info btn-sm"><i className="feather icon-edit" />&nbsp;Editar </a>
                                            <a onClick={this.eliminar.bind(this,item)} className="btn btn-danger btn-sm"><i className="feather icon-trash-2" />&nbsp;Eliminar </a>
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
                        <ActualizarDocumento
                            TipoDocto={this.props.TipoDocto}
                            onCloseModal={this.handleCloseModal}
                            Estados={this.props.Estados}
                            Datos={this.state.Datos}
                            actualizarTabla={this.props.actualizarTabla}
                        />
                    </Modal.Body>
                </Modal>

            </div>
        );
    }
}





export default RegistrarIdentificacion;