import React from 'react';
import DatePicker from "react-datepicker";
import { Row, Col, Card, Form,  Modal,Button,Table } from 'react-bootstrap';
import { ValidationForm, TextInput, SelectGroup } from 'react-bootstrap4-form-validation';
import validator from 'validator';
import callApi from '../../../service/conectorApi';
import Notificacion from '../../../service/alerts';

import Aux from "./../../../../hoc/_Aux";
import $ from 'jquery';

import avatar1 from '../../../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../../../assets/images/user/avatar-3.jpg';
import avatar4 from '../../../../assets/images/user/avatar-4.jpg';
import avatar5 from '../../../../assets/images/user/avatar-5.jpg';

import DEMO from "../../../../store/constant";


function atable() {
    let tableZero = '#data-table-zero';
    $.fn.dataTable.ext.errMode = 'throw';

    $(tableZero).DataTable();
}

class Listar extends React.Component{
    state = {
        isOpen: false
    };

    componentDidMount() {
        atable()
    }
render(){
    return (
        <Aux>
        <Row className='btn-page'>
            <Col sm={12}>
                <Card>
                    <Card.Body>
                        <Row className="align-items-center m-l-0">
                            <Col/>
                            <Col className="text-right">
                                <Button variant="success" className="btn-sm btn-round has-ripple" onClick={() => this.setState({ isOpen: true })}><i className="feather icon-plus"/> Add Doctor</Button>
                            </Col>
                        </Row>
                        <Table ref="tbl" striped hover responsive bordered id="data-table-zero">
                            <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Department</th>
                                <th>Options</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <img src={avatar2} className="img-fluid img-radius wid-40" alt=""/>
                                </td>
                                <td>Micheal Pewd</td>
                                <td>doctor@example.com</td>
                                <td>+984-46-9388638</td>
                                <td>Cardiology</td>
                                <td>
                                    <a href={DEMO.BLANK_LINK} className="btn btn-info btn-sm"><i className="feather icon-edit"/>&nbsp;Edit </a>
                                    <a href={DEMO.BLANK_LINK} className="btn btn-danger btn-sm"><i className="feather icon-trash-2"/>&nbsp;Delete </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img src={avatar3} className="img-fluid img-radius wid-40" alt=""/>
                                </td>
                                <td>Erich Mcbride</td>
                                <td>xidim@gmail.com</td>
                                <td>+612-92-1385682</td>
                                <td>Anesthetics</td>
                                <td>
                                    <a href={DEMO.BLANK_LINK} className="btn btn-info btn-sm"><i className="feather icon-edit"/>&nbsp;Edit </a>
                                    <a href={DEMO.BLANK_LINK} className="btn btn-danger btn-sm"><i className="feather icon-trash-2"/>&nbsp;Delete </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img src={avatar5} className="img-fluid img-radius wid-40" alt=""/>
                                </td>
                                <td>Micheal Pewd</td>
                                <td>doctor@example.com</td>
                                <td>+984-46-9388638</td>
                                <td>Cardiology</td>
                                <td>
                                    <a href={DEMO.BLANK_LINK} className="btn btn-info btn-sm"><i className="feather icon-edit"/>&nbsp;Edit </a>
                                    <a href={DEMO.BLANK_LINK} className="btn btn-danger btn-sm"><i className="feather icon-trash-2"/>&nbsp;Delete </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img src={avatar4} className="img-fluid img-radius wid-40" alt=""/>
                                </td>
                                <td>Erich Mcbride</td>
                                <td>xidim@gmail.com</td>
                                <td>+612-92-1385682</td>
                                <td>Anesthetics</td>
                                <td>
                                    <a href={DEMO.BLANK_LINK} className="btn btn-info btn-sm"><i className="feather icon-edit"/>&nbsp;Edit </a>
                                    <a href={DEMO.BLANK_LINK} className="btn btn-danger btn-sm"><i className="feather icon-trash-2"/>&nbsp;Delete </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img src={avatar1} className="img-fluid img-radius wid-40" alt=""/>
                                </td>
                                <td>Micheal Pewd</td>
                                <td>doctor@example.com</td>
                                <td>+984-46-9388638</td>
                                <td>Cardiology</td>
                                <td>
                                    <a href={DEMO.BLANK_LINK} className="btn btn-info btn-sm"><i className="feather icon-edit"/>&nbsp;Edit </a>
                                    <a href={DEMO.BLANK_LINK} className="btn btn-danger btn-sm"><i className="feather icon-trash-2"/>&nbsp;Delete </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img src={avatar3} className="img-fluid img-radius wid-40" alt=""/>
                                </td>
                                <td>Erich Mcbride</td>
                                <td>xidim@gmail.com</td>
                                <td>+612-92-1385682</td>
                                <td>Anesthetics</td>
                                <td>
                                    <a href={DEMO.BLANK_LINK} className="btn btn-info btn-sm"><i className="feather icon-edit"/>&nbsp;Edit </a>
                                    <a href={DEMO.BLANK_LINK} className="btn btn-danger btn-sm"><i className="feather icon-trash-2"/>&nbsp;Delete </a>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
                <Modal show={this.state.isOpen} onHide={() => this.setState({ isOpen: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title as="h5">Add Doctor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <div className="form-group fill">
                                    <label className="floating-label" htmlFor="Name">Name</label>
                                    <input type="text" className="form-control" id="Name" placeholder="Name"/>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div className="form-group fill">
                                    <label className="floating-label" htmlFor="Email">Email</label>
                                    <input type="email" className="form-control" id="Email" placeholder="Email"/>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div className="form-group fill">
                                    <label className="floating-label" htmlFor="Password">Password</label>
                                    <input type="password" className="form-control" id="Password" placeholder="Password"/>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div className="form-group fill">
                                    <label className="floating-label" htmlFor="Phone">Phone</label>
                                    <input type="text" className="form-control" id="Phone" placeholder="Phone"/>
                                </div>
                            </Col>
                            <Col sm={12}>
                                <div className="form-group fill">
                                    <label className="floating-label" htmlFor="Address">Address</label>
                                    <textarea className="form-control" id="Address" rows="3" placeholder='Address'/>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div className="form-group fill">
                                    <label className="floating-label" htmlFor="Department">Department</label>
                                    <select className="form-control" id="Department">
                                        <option value=""/>
                                        <option value="1">Anesthetics</option>
                                        <option value="2">Cardiology</option>
                                        <option value="3">Gastroenterology</option>
                                    </select>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div className="form-group fill">
                                    <label className="floating-label" htmlFor="Icon">Profie Image</label>
                                    <input type="file" className="form-control" id="Icon" placeholder="Profie Image"/>
                                </div>
                            </Col>
                            <Col sm={12}>
                                <h5 className="mt-3">Social Links</h5>
                            </Col>
                            <Col sm={6}>
                                <div className="form-group fill">
                                    <label className="floating-label" htmlFor="Facebook">Facebook Profile Link</label>
                                    <input type="text" className="form-control" id="Facebook" placeholder="Facebook Profile Link"/>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div className="form-group fill">
                                    <label className="floating-label" htmlFor="Twitter">Twitter Profile Link</label>
                                    <input type="text" className="form-control" id="Twitter" placeholder="Twitter Profile Link"/>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div className="form-group fill">
                                    <label className="floating-label" htmlFor="Google">Google Plus Link</label>
                                    <input type="text" className="form-control" id="Google" placeholder="Google Plus Link"/>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div className="form-group fill">
                                    <label className="floating-label" htmlFor="Linkedin">Linkedin Profile Link</label>
                                    <input type="text" className="form-control" id="Linkedin" placeholder="Linkedin Profile Link"/>
                                </div>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => this.setState({ isOpen: false })}>Clear</Button>
                        <Button variant="primary">Submit</Button>
                    </Modal.Footer>
                </Modal>
            </Col>
        </Row>
    </Aux>
    );
}
}

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