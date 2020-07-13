import React from 'react';
import { Row, Col, Card, Tabs, Tab, Nav, Button } from 'react-bootstrap';
import { ValidationForm, BaseFormControl, SelectGroup } from 'react-bootstrap4-form-validation';
import MaskedInput from 'react-text-mask';
import validator from 'validator';
import PNotify from "pnotify/dist/es/PNotify";


import Aux from "../../hoc/_Aux";
import RegistrarPersona from '../../App/components/persona/Registrar';
import TabsPills from '../../App/components/persona/direccion';
import RegistrarIdentificacion from '../../App/components/persona/identificacion/Registrar';
import RegistrarDireccion from '../../App/components/persona/direccion/Registrar';

import callApi from '../../App/service/conectorApi';
import Notificacion from '../../App/service/alerts';
import DocumentoIden from '../../App/components/persona/DoctomentoIdentificacion';


// class MaskWithValidation extends BaseFormControl {
//     constructor(props) {
//         super(props);
//         this.inputRef = React.createRef();
//     }

//     getInputRef() {
//         return this.inputRef.current.inputElement;
//     }

//     handleChange = (e) => {
//         this.checkError();
//         if (this.props.onChange) this.props.onChange(e);
//     };


//     render() {
//         return (
//             <React.Fragment>
//                 <MaskedInput ref={this.inputRef} {...this.filterProps()} onChange={this.handleChange} />
//                 {this.displayErrorMessage()}
//                 {this.displaySuccessMessage()}
//             </React.Fragment>
//         )
//     }
// }

class FormsValidation extends React.Component {
    state = {
        errorMessage: "Campo obligatorio",
        persona: {
            personaId: 1,
            nombre1: "",
            nombre2: "",
            nombre_otros: "",
            apellido1: "",
            apellido2: "",
            apellido_casada: "",
            fecha_nacimiento: new Date(),
            generoId: "",
            email: ""
        },
        chkBasic: false,
        chkCustom: false,
        checkMeSwitch: false,
        showModal: false
    };
    handleCheckboxChange = (e, value) => {
        this.setState({
            [e.target.name]: value
        })
    };

    handleChange = (e) => {
        this.setState({
            persona: {
                ... this.state.persona,
                [e.target.name]: e.target.value
            }
        });
        console.log("e", e);
    };


    handleSubmitPerson = async (e, formData, inputs) => {
        e.preventDefault();
        // console.log("inputs",inputs);
        // alert(JSON.stringify(formData, null, 2));
        let response = await callApi('/persona', {
            method: 'POST',
            body: JSON.stringify(this.state.persona)
        });

        const { error, body } = response;
        const { code, data } = body;
        if (error) {
            Notificacion.error(body);
        } else {
            if (code === 0) {
                this.setState({
                    persona: {
                        personaId: data.personaId
                    }
                });
                Notificacion.success("Persona registrada exitosamente");
            } else {
                Notificacion.error(data);
            }
        }


        this.setState({ showModal: true });
    };

    handleSubmitId = async (e, datosFormulario, inputs) => {
        e.preventDefault();
        datosFormulario.personaId = this.state.persona.personaId;
        let response = await callApi('/persona/identificacion', {
            method: 'POST',
            body: JSON.stringify(datosFormulario)
        });

        const { error, body } = response;
        const { code, data } = body;
        if (error) {
            Notificacion.error(body);
        } else {
            if (code === 0) {
                Notificacion.success("Documento de identifiación agregado exitosamente");
            } else {
                Notificacion.error(data);
            }
        }
    };


    handleSubmitAddress = async (e, datosFormulario, inputs) => {
        e.preventDefault();
        console.log("Datos direccion", inputs);
        datosFormulario.personaId = this.state.persona.personaId;
        let response = await callApi('/persona/direccion', {
            method: 'POST',
            body: JSON.stringify(datosFormulario)
        });

        const { error, body } = response;
        const { code, data } = body;
        if (error) {
            Notificacion.error(body);
        } else {
            if (code === 0) {
                Notificacion.success("Dirección agregada exitosamente");
            } else {
                Notificacion.error(data);
            }
        }
    };


    handleErrorSubmit = (e, formData, errorInputs) => {
        //console.log(errorInputs);
    };


    render() {
        const errorMessage = "Este campo es requerido";
        return (
            <Aux>
                <Row>
                    <Col>


                        <Card>
                            <Card.Header>
                                <Card.Title as='h5'>Persona</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Tab.Container defaultActiveKey="home">
                                    <Row>
                                        <Col sm={2}>
                                            <Nav variant="pills" className="flex-column">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="home">Persona</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    {/* hidden={true} */}
                                                    <Nav.Link eventKey="profile" disabled={this.state.persona.personaId <= 0 ? true : false}>Identificaciones</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="contact" disabled={this.state.persona.personaId <= 0 ? true : false}>Direcciones</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="settings" disabled={this.state.persona.personaId <= 0 ? true : false}>Teléfonos</Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </Col>
                                        <Col sm={10}>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="home">
                                                    <RegistrarPersona
                                                        onChange={this.handleChange}
                                                        persona={this.state.persona}
                                                        onSubmit={this.handleSubmitPerson}
                                                        onError={this.handleErrorSubmit}
                                                        errorMessage={errorMessage}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="profile">
                                                     {/* <DocumentoIden onSubmit={this.handleSubmitPerson}
                                                        onError={this.handleErrorSubmit} 
                                                        open={true}/> */}
                                                     <RegistrarIdentificacion
                                                        onChange={this.handleChange}
                                                        onSubmit={this.handleSubmitId}
                                                        onError={this.handleErrorSubmit}
                                                        errorMessage={errorMessage}
                                                    /> 

                                                </Tab.Pane>
                                                <Tab.Pane eventKey="contact">
                                                    <RegistrarDireccion
                                                        onSubmit={this.handleSubmitAddress}
                                                        onError={this.handleErrorSubmit}
                                                        errorMessage={errorMessage}
                                                        
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="settings">
                                                    <TabsPills></TabsPills>
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
        );
    }
}

export default FormsValidation;