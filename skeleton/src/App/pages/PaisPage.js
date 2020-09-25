// import React from 'react';
// import { PaisListar } from '../components/base/PaisListar';
// const PaisPage = () => {
//     return (
//         <PaisListar/>
//     )
// }

// export default PaisPage





import React from 'react';
import {
    Row,
    Col,
    Card,
    Modal,
    Button,
    Table
} from 'react-bootstrap';

import Aux from '../../hoc/_Aux'
import $ from 'jquery';

$.DataTable = require('datatables.net-bs');
require('datatables.net-responsive-bs');


const PaisPage = () => {
    return (
        <Aux>
            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>
                        <Card.Body>
                            
                            <div className="mb-3 input-group input-group-sm"><div className="input-group-prepend"><span className="input-group-text" id="inputGroup-sizing-sm">Filtrar Por:</span></div><input aria-label="Small" aria-describedby="inputGroup-sizing-sm" className="form-control"/></div>

                            <Table striped hover responsive bordered id="data-table-zero">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Department</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Micheal Pewd</td>
                                        <td>doctor@example.com</td>
                                        <td>+984-46-9388638</td>
                                        <td>Cardiology</td>
                                        <td>
                                            <a href="" className="btn btn-info btn-sm"><i className="feather icon-edit" />&nbsp;Edit </a>
                                            <a href="" className="btn btn-danger btn-sm"><i className="feather icon-trash-2" />&nbsp;Delete </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Erich Mcbride</td>
                                        <td>xidim@gmail.com</td>
                                        <td>+612-92-1385682</td>
                                        <td>Anesthetics</td>
                                        <td>
                                            <a href="" className="btn btn-info btn-sm"><i className="feather icon-edit" />&nbsp;Edit </a>
                                            <a href="" className="btn btn-danger btn-sm"><i className="feather icon-trash-2" />&nbsp;Delete </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Micheal Pewd</td>
                                        <td>doctor@example.com</td>
                                        <td>+984-46-9388638</td>
                                        <td>Cardiology</td>
                                        <td>
                                            <a href="" className="btn btn-info btn-sm"><i className="feather icon-edit" />&nbsp;Edit </a>
                                            <a href="" className="btn btn-danger btn-sm"><i className="feather icon-trash-2" />&nbsp;Delete </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Erich Mcbride</td>
                                        <td>xidim@gmail.com</td>
                                        <td>+612-92-1385682</td>
                                        <td>Anesthetics</td>
                                        <td>
                                            <a href="" className="btn btn-info btn-sm"><i className="feather icon-edit" />&nbsp;Edit </a>
                                            <a href="" className="btn btn-danger btn-sm"><i className="feather icon-trash-2" />&nbsp;Delete </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Micheal Pewd</td>
                                        <td>doctor@example.com</td>
                                        <td>+984-46-9388638</td>
                                        <td>Cardiology</td>
                                        <td>
                                            <a href="" className="btn btn-info btn-sm"><i className="feather icon-edit" />&nbsp;Edit </a>
                                            <a href="" className="btn btn-danger btn-sm"><i className="feather icon-trash-2" />&nbsp;Delete </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Erich Mcbride</td>
                                        <td>xidim@gmail.com</td>
                                        <td>+612-92-1385682</td>
                                        <td>Anesthetics</td>
                                        <td>
                                            <a href="" className="btn btn-info btn-sm"><i className="feather icon-edit" />&nbsp;Edit </a>
                                            <a href="" className="btn btn-danger btn-sm"><i className="feather icon-trash-2" />&nbsp;Delete </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    )
}

export default PaisPage