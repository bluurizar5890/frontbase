import React from 'react';
import DatePicker from "react-datepicker";
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { ValidationForm, TextInput, SelectGroup } from 'react-bootstrap4-form-validation';
import validator from 'validator';
import callApi from '../../../service/conectorApi';
import Notificacion from '../../../service/alerts';

class RegistrarDireccion extends React.Component {
    state = {
        departamentos: [],
        municipios: []
    }
    componentDidMount() {
        this.getDepartamentos();
    }
    getDepartamentos = async () => {
        let response = await callApi('/departamento?estadoId=1', {
            method: 'GET'
        });
        const { error, body } = response;
        const { code, data } = body;
        if (error) {
            Notificacion.error(body);
        } else {
            if (code === 0) {
                this.setState({
                    departamentos: data
                });
            } else {
                Notificacion.error(data);
            }
        }
    }
    handleChange = async (event) => {
        let departamentoId = event.value;
        let response = await callApi(`/municipio?estadoId=1&departamentoId=${departamentoId}`, {
            method: 'GET'
        });
        const { error, body } = response;
        const { code, data } = body;
        if (error) {
            Notificacion.error(body);
        } else {
            if (code === 0) {
                this.setState({
                    municipios: data
                });
            } else {
                Notificacion.error(data);
            }
        }
    };

    render() {
        return (
            <Card>
                <Card.Header>
                    <Card.Title as="h5">Direcciones</Card.Title>
                </Card.Header>
                <Card.Body>
                    <ValidationForm onSubmit={this.props.onSubmit} onErrorSubmit={this.props.onError}>
                        <Form.Row>
                            <Form.Group as={Col} md="6">
                                <Form.Label htmlFor="departamentoId">Departamento</Form.Label>
                                <Select onChange={this.handleChange}
                                    name="departamentoId"
                                    id="departamentoId"
                                    required
                                    className="form-control"
                                    classNamePrefix="select"
                                    errorMessage={this.props.errorMessage}
                                    defaultValue={this.state.departamentos}
                                    options={this.state.departamentos}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="6">
                                <Form.Label htmlFor="municipioId">Municipio</Form.Label>
                                {/* <Select
                                    name="municipioId"
                                    id="municipioId"
                                    required
                                    className="form-control"
                                    classNamePrefix="select"
                                    errorMessage={this.props.errorMessage}
                                    onChange={this.props.onChange}
                                    defaultValue={this.state.municipios}
                                    options={this.state.municipios}
                                /> */}
                                 <SelectGroup
                                    name="municipioId"
                                    id="municipioId"
                                    required
                                    className="form-control"
                                    errorMessage={this.props.errorMessage}
                                   >
                                    <option value="">Municipio</option>
                                    {
                                        this.state.municipios.map(item=>{
                                            return(
                                            <option value={item.value} key={item.value}>{item.label}</option>
                                            )
                                        })
                                    }
                                </SelectGroup>

                            </Form.Group>

                            <Form.Group as={Col} md="12">
                                <Form.Label htmlFor="direccion">Dirección</Form.Label>
                                <TextInput
                                    name="direccion"
                                    id="direccion"
                                    required
                                    errorMessage={this.props.errorMessage}
                                    placeholder="Dirección"
                                    autoComplete="off"
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="12">
                                <Form.Label htmlFor="punto_referencia">Punto de Referencia</Form.Label>
                                <TextInput
                                    name="punto_referencia"
                                    id="punto_referencia"
                                    errorMessage={this.props.errorMessage}
                                    placeholder="Punto de referencia"
                                    autoComplete="off"
                                />
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
}

export default RegistrarDireccion;