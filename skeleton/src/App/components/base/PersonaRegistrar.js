import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import { Col, Card, Form, Button } from 'react-bootstrap';
import { ValidationForm, TextInput, SelectGroup } from 'react-bootstrap4-form-validation';
import validator from 'validator';
import { useForm } from '../../hooks/useForm';
import moment from 'moment';
import Datetime from 'react-datetime';
import { useFetch } from '../../hooks/useFetch';
import callApi from '../../service/conectorApi';
import Notificacion from '../../../App/service/alerts';
export const PersonaRegistrar = (props) => {

    const [persona, handleOnChange, , setFecha] = useForm({
        nombre1: '',
        nombre2: '',
        nombre_otros: '',
        apellido1: '',
        apellido2: '',
        apellido_casada: '',
        fecha_nacimiento: '',
        email: '',
        generoId: ''
    });
    //const { data, loading, error } = useFetch("persona", persona, "POST");
    //console.log(data);
    const handleOnSubmit =async (e) => {
        e.preventDefault();
        let response = await callApi('/persona', {
            method: 'POST',
            body: JSON.stringify(persona)
        });

        const { error, body } = response;
        const { code, data } = body;
        if (error) {
            Notificacion.error(body);
        } else {
            if (code === 0) {
                // this.setState({
                //     persona: {
                //         personaId: data.personaId
                //     }
                // });
                Notificacion.success("Persona registrada exitosamente");
            } else {
                Notification.error(data);
            }
        }

        props.handleSetIdPersona("Soy el id");
    }

    const handleErrorSubmit = (e, formData, errorInputs) => {
        console.log(errorInputs);
    };

    const handleSetFecha = (fecha) => {
        const fechaFormat = moment(fecha).format('DD/MM/YYYY');
        setFecha("fecha_nacimiento", fechaFormat);
    }

    const errorMessage = "Campo obligatorio";
    return (
        <Card>
            <Card.Header>
                <Card.Title as="h5">Datos Personales</Card.Title>
            </Card.Header>
            <Card.Body>
                <ValidationForm onSubmit={handleOnSubmit} onErrorSubmit={handleErrorSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="6">
                            <Form.Label htmlFor="nombre1">Primer Nombre</Form.Label>
                            <TextInput
                                name="nombre1"
                                id="nombre1"
                                errorMessage={errorMessage}
                                placeholder="Primer Nombre"
                                required value={persona.nombre1}
                                onChange={handleOnChange}
                                autoComplete="off"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label htmlFor="nombre2">Segundo Nombre</Form.Label>
                            <TextInput
                                name="nombre2"
                                id="nombre2"
                                placeholder="Segundo Nombre"
                                value={persona.nombre2}
                                onChange={handleOnChange}
                                autoComplete="off"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label htmlFor="nombre_otros">Otros Nombres</Form.Label>
                            <TextInput
                                name="nombre_otros"
                                id="nombre_otros"
                                placeholder="Otros Nombres"
                                value={persona.nombre_otros}
                                onChange={handleOnChange}
                                autoComplete="off"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label htmlFor="apellido1">Primer Apellido</Form.Label>
                            <TextInput
                                name="apellido1"
                                id="apellido1"
                                placeholder="Primer Apellido"
                                errorMessage={errorMessage}
                                required
                                value={persona.apellido1}
                                onChange={handleOnChange}
                                autoComplete="off"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label htmlFor="apellido2">Segundo Apellido</Form.Label>
                            <TextInput
                                name="apellido2"
                                id="apellido2"
                                placeholder="Segundo Apellido"
                                value={persona.apellido2}
                                onChange={handleOnChange}
                                autoComplete="off"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label htmlFor="apellido_casada">Apellido de Casada</Form.Label>
                            <TextInput
                                name="apellido_casada"
                                id="apellido_casada"
                                placeholder="Apellido de Casada"
                                value={persona.apellido_casada}
                                onChange={handleOnChange}
                                autoComplete="off"
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="6">

                            <Form.Label htmlFor="fecha_nacimiento">Fecha de Nacimiento</Form.Label>
                            {/* <Datetime 
                                timeFormat={false} 
                                inputProps={{placeholder: 'Por favor seleccione una fecha'}} 
                                value={persona.fecha_nacimiento} 
                                onChange={handleSetFecha} 

                                /> */}
                            <div className="form-group">
                                <DatePicker
                                    id="fecha_nacimiento"
                                    name="fecha_nacimiento"
                                    dateFormat="dd/MM/yyyy"
                                    value={persona.fecha_nacimiento}
                                    onChange={handleSetFecha}
                                    required
                                    errorMessage={props.errorMessage}
                                    className="form-control"
                                    placeholderText="Fecha de nacimiento"
                                    autoComplete="off"
                                    minDate={new Date()}

                                />
                            </div>
                        </Form.Group>


                        <Form.Group as={Col} md="6">
                            <Form.Label htmlFor="email">Correo Electrónico</Form.Label>
                            <TextInput
                                name="email"
                                id="email"
                                type="email"
                                placeholder="Correo Electrónico"
                                validator={validator.isEmail}
                                required
                                errorMessage={{ validator: "Por favor ingrese un correo válido" }}
                                value={persona.email}
                                onChange={handleOnChange}
                                autoComplete="off"
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="6">
                            <Form.Label htmlFor="generoId">Género</Form.Label>
                            <SelectGroup
                                name="generoId"
                                id="generoId"
                                value={persona.generoId}
                                required
                                errorMessage={errorMessage}
                                onChange={handleOnChange}>
                                <option value="">Seleccione un género</option>
                                <option value="1">Masculino</option>
                                <option value="2">Femenino</option>
                            </SelectGroup>
                        </Form.Group>

                        <Form.Group as={Col} sm={12} className="mt-3">
                            <Button type="submit">Registrar</Button>
                        </Form.Group>
                    </Form.Row>
                </ValidationForm>
            </Card.Body>
        </Card>
    );
}
