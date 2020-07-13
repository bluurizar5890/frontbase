import React from 'react';
import DatePicker from "react-datepicker";
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { ValidationForm, TextInput, SelectGroup } from 'react-bootstrap4-form-validation';
import validator from 'validator';
//import Moment from 'react-moment';
import { useState } from 'react';
import moment from 'moment';


// class RegistrarPersona extends React.Component {
//     render() {
const RegistrarPersona=(props)=>{
    const [date,setDate]=useState(new Date());
    const handleSetFecha=(fecha)=>{
        setDate(fecha)
        let fecha_nacimiento = moment(fecha).format('YYYY/MM/DD');
        props.persona.fecha_nacimiento=fecha_nacimiento;
    }
        return (
            <Card>
                <Card.Header>
                    <Card.Title as="h5">Datos Personales</Card.Title>
                </Card.Header>
                <Card.Body>
                    <ValidationForm onSubmit={props.onSubmit} onErrorSubmit={props.onError}>
                        <Form.Row>
                            <Form.Group as={Col} md="6">
                                <Form.Label htmlFor="nombre1">Primer Nombre</Form.Label>
                                <TextInput
                                    name="nombre1"
                                    id="nombre1"
                                    errorMessage={props.errorMessage}
                                    placeholder="Primer Nombre"
                                    required value={props.persona.nombre1}
                                    onChange={props.onChange}
                                    autoComplete="off"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label htmlFor="nombre2">Segundo Nombre</Form.Label>
                                <TextInput
                                    name="nombre2"
                                    id="nombre2"
                                    placeholder="Segundo Nombre"
                                    value={props.persona.nombre2}
                                    onChange={props.onChange}
                                    autoComplete="off"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label htmlFor="nombre_otros">Otros Nombres</Form.Label>
                                <TextInput
                                    name="nombre_otros"
                                    id="nombre_otros"
                                    placeholder="Otros Nombres"
                                    value={props.persona.nombre_otros}
                                    onChange={props.onChange}
                                    autoComplete="off"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label htmlFor="apellido1">Primer Apellido</Form.Label>
                                <TextInput
                                    name="apellido1"
                                    id="apellido1"
                                    placeholder="Primer Apellido"
                                    errorMessage={props.errorMessage}
                                    required
                                    value={props.persona.apellido1}
                                    onChange={props.onChange}
                                    autoComplete="off"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label htmlFor="apellido2">Segundo Apellido</Form.Label>
                                <TextInput
                                    name="apellido2"
                                    id="apellido2"
                                    placeholder="Segundo Apellido"
                                    value={props.persona.apellido2}
                                    onChange={props.onChange}
                                    autoComplete="off"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6">
                                <Form.Label htmlFor="apellido_casada">Apellido de Casada</Form.Label>
                                <TextInput
                                    name="apellido_casada"
                                    id="apellido_casada"
                                    placeholder="Apellido de Casada"
                                    value={props.persona.apellido_casada}
                                    onChange={props.onChange}
                                    autoComplete="off"
                                />
                            </Form.Group>
                            
                            <Form.Group as={Col} md="6">
                                <Form.Label htmlFor="fecha_nacimiento">Fecha de Nacimiento</Form.Label>
                                <DatePicker
                                id="fecha_nacimiento"
                                name="fecha_nacimiento"
                                dateFormat="dd/MM/yyyy"
                                selected={date} 
                                onChange={handleSetFecha}
                                required
                                errorMessage={props.errorMessage}
                                className="form-control"
                                />
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
                                    value={props.persona.email}
                                    onChange={props.onChange}
                                    autoComplete="off"
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="6">
                                <Form.Label htmlFor="generoId">Género</Form.Label>
                                <SelectGroup
                                    name="generoId"
                                    id="generoId"
                                    value={props.persona.generoId}
                                    required
                                    errorMessage={props.errorMessage}
                                    onChange={props.onChange}>
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
    //}
}

export default RegistrarPersona;