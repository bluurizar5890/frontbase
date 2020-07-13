import React,{ useState, useEffect } from 'react';
import { ValidationForm, TextInput, SelectGroup } from 'react-bootstrap4-form-validation';
import {
    Row,
    Col,
    Card,
    Modal,
    Button,
    Table
} from 'react-bootstrap';

import callApi from '../../service/conectorApi';
import Notificacion from '../../service/alerts';
function useTipoDocumento(){
    const [TipoDocumentos,setTipoDocumentos]=useState([]);
    useEffect(()=>{
        callApi('/tipodocumento?estadoId=1', {
            method: 'GET'
        })
        .then(response=>{
            const {error,body}=response;
            const {code,data}=body;
            if(error){
                Notificacion.error(body);
            }else{
                if(code===0){
                   setTipoDocumentos(data);
                }else{
                    Notificacion.error(data);
                }
            }
        });
    },[]);

    return {TipoDocumentos};
}

const DocumentoIden=(props)=>{
    const TipoDocumentos=useTipoDocumento();
    const{Open,setOpen}=useState(true);
    return(
    <ValidationForm onSubmit={props.onSubmit} onErrorSubmit={props.onError}>
     <Modal show={props.open} onHide={() => props.open=false}>
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
                                <Button variant="danger" onClick={() => props.open=false}>Clear</Button>
                                <Button variant="primary">Submit</Button>
                            </Modal.Footer>
                        </Modal>
    </ValidationForm>
    )
}

export default DocumentoIden;