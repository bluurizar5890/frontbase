// https://medium.com/better-programming/how-to-add-form-validation-to-your-react-app-e19f076e6c10
import React from 'react';
import DatePicker from "react-datepicker";
import { Row, Col, Card, Form,  Modal,Button,Table } from 'react-bootstrap';
import { ValidationForm, TextInput, SelectGroup } from 'react-bootstrap4-form-validation';
import validator from 'validator';
import callApi from '../../../service/conectorApi';
import Notificacion from '../../../service/alerts';

import Aux from "./../../../../hoc/_Aux";
import $ from 'jquery';

import DEMO from "../../../../store/constant";


class Listar extends React.Component {
    state={
        data:[]
    }
    componentDidMount() {
        //atable()
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
            <Table ref="tbl" striped hover responsive bordered id="table_dentificaciones_persona">
            <thead>
            <tr>
                <th>Código</th>
                <th>Tipo</th>
                <th>Número</th>
                <th>Fecha de Registro</th>
                <th>Opciones</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>DPI</td>
                <td>2133112541503</td>
                <td>13/03/2020</td>
                <td>
                    <a href={DEMO.BLANK_LINK} className="btn btn-info btn-sm"><i className="feather icon-edit"/>&nbsp;Editar </a>
                    <a href={DEMO.BLANK_LINK} className="btn btn-danger btn-sm"><i className="feather icon-trash-2"/>&nbsp;Eliminar </a>
                </td>
            </tr>
            </tbody>
        </Table>
        );
    }
}


class RegistrarIdentificacion extends React.Component{
    state = {
        data:[],
        isOpen: false
    };
   
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


    handleSubmit = async (e, datosFormulario, inputs) => {
        e.preventDefault();
        console.log("Datos direccion", inputs);
    };


    handleErrorSubmit = (e, formData, errorInputs) => {
        console.log(errorInputs);
    };


render(){
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
                            <Col/>
                            <Col className="text-right">
                                <Button variant="success" className="btn-sm btn-round has-ripple" onClick={() => this.setState({ isOpen: true })}><i className="feather icon-plus"/> Agregar documento</Button>
                            </Col>
                        </Row>
                       <Listar></Listar>
                    </Card.Body>
                </Card>
                <Modal show={this.state.isOpen} onHide={() => this.setState({ isOpen: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title as="h5">Título Acción</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <ValidationForm onSubmit={this.props.onSubmit} onErrorSubmit={this.props.onError}>
                        <Form.Row>
                        <Form.Group as={Col} md="12">
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

                            <Form.Group as={Col} md="12">
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
                            <Form.Group as={Col} sm={6} className="mt-3">
                                <Button type="submit">Registrar</Button>
                                <Button variant="danger" type="button">Cancelar</Button>
                            </Form.Group>
                        </Form.Row>
                    </ValidationForm>
                    </Modal.Body>
                </Modal>
            </Col>
        </Row>
    </Aux>
    );
}
}



export default RegistrarIdentificacion;