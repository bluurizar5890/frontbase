import React from 'react';
import { Row, Col, Card,Modal, Tabs,Button, Table,Tab, Nav } from 'react-bootstrap';

import $ from 'jquery';

import avatar1 from '../../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../../assets/images/user/avatar-3.jpg';
import avatar5 from '../../../assets/images/user/avatar-5.jpg';

import RegistrarDireccion from './direccion/Registrar';
import DEMO from "../../../store/constant";

import Aux from "../../../hoc/_Aux";

$.DataTable = require( 'datatables.net-bs' );
require( 'datatables.net-responsive-bs' );

function atable() {
    let tableZero = '#data-table-zero';
    $.fn.dataTable.ext.errMode = 'throw';

    $(tableZero).DataTable();
}

class TabsPills extends React.Component {
    state = {
        isOpen: false
    };

    componentDidMount() {
        atable()
    }
    

    handleSubmitAddress = async (e, datosFormulario, inputs) => {
        e.preventDefault();
        console.log("Datos direccion",datosFormulario);
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
                                <Card.Title as='h5'>Teléfonos</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Tabs variant="pills" defaultActiveKey="home" className="mb-3">
                                    <Tab eventKey="home" title="Todos">
                                        
                                    <Row className="align-items-center m-l-0">
                                    <Col/>
                                    <Col className="text-right">
                                        <Button variant="success" className="btn-sm btn-round has-ripple" onClick={() => this.setState({ isOpen: true })}><i className="feather icon-plus"/> Add Patient</Button>
                                    </Col>
                                </Row>
                                <Table ref="tbl" striped hover responsive bordered id="data-table-zero">
                                    <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Sex</th>
                                        <th>Birth Date</th>
                                        <th>Age</th>
                                        <th>Blood G.</th>
                                        <th>Options</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <img src={avatar2} className="img-fluid img-radius wid-40" alt=""/>
                                        </td>
                                        <td>Micheal Pewd</td>
                                        <td>patient@temp.com</td>
                                        <td>+984-9388638</td>
                                        <td>male</td>
                                        <td>09/10/1990</td>
                                        <td>27</td>
                                        <td>B+</td>
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
                                        <td>xidim@temp.com</td>
                                        <td>+612-1385682</td>
                                        <td>female</td>
                                        <td>09/10/1990</td>
                                        <td>27</td>
                                        <td>B+</td>
                                        <td>
                                            <a href={DEMO.BLANK_LINK} className="btn btn-info btn-sm"><i className="feather icon-edit"/>&nbsp;Edit </a>
                                            <a href={DEMO.BLANK_LINK} className="btn btn-danger btn-sm"><i className="feather icon-trash-2"/>&nbsp;Delete </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src={avatar3} className="img-fluid img-radius wid-40" alt=""/>
                                        </td>
                                        <td>Micheal Pewd</td>
                                        <td>patient@temp.com</td>
                                        <td>+984-9388638</td>
                                        <td>male</td>
                                        <td>09/10/1990</td>
                                        <td>27</td>
                                        <td>B+</td>
                                        <td>
                                            <a href={DEMO.BLANK_LINK} className="btn btn-info btn-sm"><i className="feather icon-edit"/>&nbsp;Edit </a>
                                            <a href={DEMO.BLANK_LINK} className="btn btn-danger btn-sm"><i className="feather icon-trash-2"/>&nbsp;Delete </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src={avatar5} className="img-fluid img-radius wid-40" alt=""/>
                                        </td>
                                        <td>Erich Mcbride</td>
                                        <td>xidim@temp.com</td>
                                        <td>+612-1385682</td>
                                        <td>female</td>
                                        <td>09/10/1990</td>
                                        <td>27</td>
                                        <td>B+</td>
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
                                        <td>patient@temp.com</td>
                                        <td>+984-9388638</td>
                                        <td>male</td>
                                        <td>09/10/1990</td>
                                        <td>27</td>
                                        <td>B+</td>
                                        <td>
                                            <a href={DEMO.BLANK_LINK} className="btn btn-info btn-sm"><i className="feather icon-edit"/>&nbsp;Edit </a>
                                            <a href={DEMO.BLANK_LINK} className="btn btn-danger btn-sm"><i className="feather icon-trash-2"/>&nbsp;Delete </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src={avatar2} className="img-fluid img-radius wid-40" alt=""/>
                                        </td>
                                        <td>Micheal Pewd</td>
                                        <td>patient@temp.com</td>
                                        <td>+984-9388638</td>
                                        <td>male</td>
                                        <td>09/10/1990</td>
                                        <td>27</td>
                                        <td>B+</td>
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
                                        <td>xidim@temp.com</td>
                                        <td>+612-1385682</td>
                                        <td>female</td>
                                        <td>09/10/1990</td>
                                        <td>27</td>
                                        <td>B+</td>
                                        <td>
                                            <a href={DEMO.BLANK_LINK} className="btn btn-info btn-sm"><i className="feather icon-edit"/>&nbsp;Edit </a>
                                            <a href={DEMO.BLANK_LINK} className="btn btn-danger btn-sm"><i className="feather icon-trash-2"/>&nbsp;Delete </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src={avatar3} className="img-fluid img-radius wid-40" alt=""/>
                                        </td>
                                        <td>Micheal Pewd</td>
                                        <td>patient@temp.com</td>
                                        <td>+984-9388638</td>
                                        <td>male</td>
                                        <td>09/10/1990</td>
                                        <td>27</td>
                                        <td>B+</td>
                                        <td>
                                            <a href={DEMO.BLANK_LINK} className="btn btn-info btn-sm"><i className="feather icon-edit"/>&nbsp;Edit </a>
                                            <a href={DEMO.BLANK_LINK} className="btn btn-danger btn-sm"><i className="feather icon-trash-2"/>&nbsp;Delete </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src={avatar5} className="img-fluid img-radius wid-40" alt=""/>
                                        </td>
                                        <td>Erich Mcbride</td>
                                        <td>xidim@temp.com</td>
                                        <td>+612-1385682</td>
                                        <td>female</td>
                                        <td>09/10/1990</td>
                                        <td>27</td>
                                        <td>B+</td>
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
                                        <td>patient@temp.com</td>
                                        <td>+984-9388638</td>
                                        <td>male</td>
                                        <td>09/10/1990</td>
                                        <td>27</td>
                                        <td>B+</td>
                                        <td>
                                            <a href={DEMO.BLANK_LINK} className="btn btn-info btn-sm"><i className="feather icon-edit"/>&nbsp;Edit </a>
                                            <a href={DEMO.BLANK_LINK} className="btn btn-danger btn-sm"><i className="feather icon-trash-2"/>&nbsp;Delete </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src={avatar2} className="img-fluid img-radius wid-40" alt=""/>
                                        </td>
                                        <td>Micheal Pewd</td>
                                        <td>patient@temp.com</td>
                                        <td>+984-9388638</td>
                                        <td>male</td>
                                        <td>09/10/1990</td>
                                        <td>27</td>
                                        <td>B+</td>
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
                                        <td>xidim@temp.com</td>
                                        <td>+612-1385682</td>
                                        <td>female</td>
                                        <td>09/10/1990</td>
                                        <td>27</td>
                                        <td>B+</td>
                                        <td>
                                            <a href={DEMO.BLANK_LINK} className="btn btn-info btn-sm"><i className="feather icon-edit"/>&nbsp;Edit </a>
                                            <a href={DEMO.BLANK_LINK} className="btn btn-danger btn-sm"><i className="feather icon-trash-2"/>&nbsp;Delete </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src={avatar3} className="img-fluid img-radius wid-40" alt=""/>
                                        </td>
                                        <td>Micheal Pewd</td>
                                        <td>patient@temp.com</td>
                                        <td>+984-9388638</td>
                                        <td>male</td>
                                        <td>09/10/1990</td>
                                        <td>27</td>
                                        <td>B+</td>
                                        <td>
                                            <a href={DEMO.BLANK_LINK} className="btn btn-info btn-sm"><i className="feather icon-edit"/>&nbsp;Edit </a>
                                            <a href={DEMO.BLANK_LINK} className="btn btn-danger btn-sm"><i className="feather icon-trash-2"/>&nbsp;Delete </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src={avatar5} className="img-fluid img-radius wid-40" alt=""/>
                                        </td>
                                        <td>Erich Mcbride</td>
                                        <td>xidim@temp.com</td>
                                        <td>+612-1385682</td>
                                        <td>female</td>
                                        <td>09/10/1990</td>
                                        <td>27</td>
                                        <td>B+</td>
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
                                        <td>patient@temp.com</td>
                                        <td>+984-9388638</td>
                                        <td>male</td>
                                        <td>09/10/1990</td>
                                        <td>27</td>
                                        <td>B+</td>
                                        <td>
                                            <a href={DEMO.BLANK_LINK} className="btn btn-info btn-sm"><i className="feather icon-edit"/>&nbsp;Edit </a>
                                            <a href={DEMO.BLANK_LINK} className="btn btn-danger btn-sm"><i className="feather icon-trash-2"/>&nbsp;Delete </a>
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>



                                    </Tab>
                                    <Tab eventKey="profile" title="Nuevo">
                                        <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p>
                                    </Tab>
                                    <Tab eventKey="contact" title="Actualizar">
                                        <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you probably haven't heard of them, vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth chambray yr.</p>
                                    </Tab>
                                </Tabs>
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

export default TabsPills;
