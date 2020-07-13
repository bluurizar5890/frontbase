import React from 'react';
import DatePicker from "react-datepicker";
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { ValidationForm, TextInput, SelectGroup } from 'react-bootstrap4-form-validation';
import validator from 'validator';
import callApi from '../../../service/conectorApi';
import Notificacion from '../../../service/alerts';
class RegistrarIdentificacion extends React.Component {
    state={
        data:[]
    }
    componentDidMount() {
       this.getTipoIdentificacion();
    }

    getTipoIdentificacion=async()=>{
        let response = await callApi('/tipodocumento?estadoId=1', {
            method: 'GET'
        });
        const {error,body}=response;
        const {code,data}=body;
        if(error){
            Notificacion.error(body);
        }else{
            if(code===0){
                this.setState({
                    data:data
                });
            }else{
                Notificacion.error(data);
            }
        }

    }

    render() {
        return (
            <Card>
                <Card.Header>
                    <Card.Title as="h5">Identificaciones</Card.Title>
                </Card.Header>
                <Card.Body>
                    <ValidationForm onSubmit={this.props.onSubmit} onErrorSubmit={this.props.onError}>
                        <Form.Row>
                        <Form.Group as={Col} md="6">
                                <Form.Label htmlFor="tipo_documentoId">Tipo Identificación</Form.Label>
                                <SelectGroup
                                    name="tipo_documentoId"
                                    id="tipo_documentoId"
                                    required
                                    errorMessage={this.props.errorMessage}
                                    onChange={this.props.onChange}>
                                    <option value="">Seleccione un tipo de identificación</option>
                                    {
                                        this.state.data.map(item=>{
                                            return(
                                            <option value={item.tipo_documentoId} key={item.tipo_documentoId}>{item.descripcion}</option>
                                            )
                                        })
                                    }
                                </SelectGroup>
                            </Form.Group>

                            <Form.Group as={Col} md="6">
                                <Form.Label htmlFor="numero_identificacion">Número de Identificación</Form.Label>
                                <TextInput
                                    name="numero_identificacion"
                                    id="numero_identificacion"
                                    required
                                    errorMessage={this.props.errorMessage}
                                    placeholder="Número de identificación"
                                    onChange={this.props.onChange}
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

export default RegistrarIdentificacion;