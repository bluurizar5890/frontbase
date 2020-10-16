import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { Form, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { ValidationForm, TextInput, SelectGroup } from 'react-bootstrap4-form-validation';
import Swal from 'sweetalert2';
import callApi from '../../../helpers/conectorApi';
import Aux from '../../../hoc/_Aux';
import withReactContent from 'sweetalert2-react-content';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { MunicipioUpSert } from './MunicipioUpSert';
import { useSelector } from 'react-redux';
import { NoAutorizado } from '../NoAutorizado';
import { useForm } from '../../hooks/useForm';
const menuId = 26;
const menuIdUsuario = 17;
export const BitacoraPeticionListar = () => {
    const state = useSelector(state => state);
    const [accesos, setAccesos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [values, handleOnChange,,setValues] = useForm({
        baseUrl: '',
        method: "",
        status: "",
        error: '',
        usuarioId: '',
        fechaInicial: '',
        fechaFinal: '',
        ip_origen: ''
    });

    const GetAccesosByMenuId = () => {
        if (state?.accesos) {
            const { accesos } = state;
            const misAccesos = accesos.filter(item => (item.menuId === menuId || item.menuId === menuIdUsuario));
            setAccesos(misAccesos);
        }
    }

    const GetUsuarios = async () => {
        if (accesos.find(acceso => acceso.menuId === menuIdUsuario && acceso.accesoId === 3)) {
            let response = await callApi('usuario?estadoId=1&include=0');
            if (response) {
                let listUsuario = [];
                response.map(({ usuarioId, user_name }) => {
                    listUsuario.push({
                        value: usuarioId,
                        label: user_name,
                    })
                });
                setUsuarios(listUsuario);
            }
        }
    }
    const handleChangeUsuario = ({ value }) => {
        setValues({ ...values, usuarioId: value });
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log({values});
    }

    useEffect(() => {
        GetAccesosByMenuId();
    }, []);

    useEffect(() => {
        GetUsuarios();
    }, [accesos])

    return (
        <Aux>
            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Listado de Peticiones</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row className="align-items-center m-l-0">
                                <Col>
                                    <ValidationForm onSubmit={handleOnSubmit} >
                                        <Form.Row>
                                            <Form.Group as={Col} md="3">
                                                <Form.Label htmlFor="baseUrl">Base Url</Form.Label>
                                                <TextInput
                                                    name="baseUrl"
                                                    placeholder="Base Url"
                                                    autoComplete="off"
                                                    type="text"
                                                    value={values.baseUrl}
                                                    onChange={handleOnChange}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="3">
                                                <Form.Label htmlFor="method">Metodo</Form.Label>
                                                <SelectGroup
                                                    name="method"
                                                    id="method"
                                                    value={values.method}
                                                    onChange={handleOnChange}
                                                >
                                                    <option value="">Todos</option>
                                                    <option value="POST">POST</option>
                                                    <option value="GET">GET</option>
                                                    <option value="PUT">PUT</option>
                                                    <option value="PATCH">PATCH</option>
                                                    <option value="DELETE">DELETE</option>
                                                </SelectGroup>
                                            </Form.Group>
                                            <Form.Group as={Col} md="3">
                                                <Form.Label htmlFor="status">Código Estado Http</Form.Label>
                                                <TextInput
                                                    name="status"
                                                    id="status"
                                                    placeholder="Código de estado"
                                                    autoComplete="off"
                                                    type="number"
                                                    value={values.status}
                                                    onChange={handleOnChange}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="3">
                                                <Form.Label htmlFor="status">Ip Cliente</Form.Label>
                                                <TextInput
                                                    name="ip_origen"
                                                    id="ip_origen"
                                                    placeholder="Ip Cliente"
                                                    autoComplete="off"
                                                    type="text"
                                                    value={values.ip_origen}
                                                    onChange={handleOnChange}
                                                />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} md="3">
                                                <Form.Label htmlFor="usuarioId">Usuario</Form.Label>
                                                <Select
                                                    id="usuarioId"
                                                    name="usuarioId"
                                                    className="basic-single"
                                                    classNamePrefix="select"
                                                    required
                                                    placeholder="Usuario"
                                                    onChange={handleChangeUsuario}
                                                    options={usuarios}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="3">
                                                <Form.Label htmlFor="fechaInicial">Fecha Inicial</Form.Label>
                                                <TextInput
                                                    name="fechaInicial"
                                                    id="fechaInicial"
                                                    placeholder="dd/MM/yyyy"
                                                    autoComplete="off"
                                                    type="text"
                                                    value={values.fechaInicial}
                                                    onChange={handleOnChange}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="3">
                                                <Form.Label htmlFor="fechaFinal">Fecha Final</Form.Label>
                                                <TextInput
                                                    name="fechaFinal"
                                                    id="fechaFinal"
                                                    placeholder="dd/MM/yyyy"
                                                    autoComplete="off"
                                                    type="text"
                                                    value={values.fechaFinal}
                                                    onChange={handleOnChange}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="2">
                                                <Form.Label htmlFor="error">Estado</Form.Label>
                                                <SelectGroup
                                                    name="error"
                                                    id="error"
                                                    value={values.error}
                                                    onChange={handleOnChange}
                                                >
                                                    <option value="">Todos</option>
                                                    <option value="0">Satisfactorias</option>
                                                    <option value="1">Erroneas</option>
                                                </SelectGroup>
                                            </Form.Group>
                                            <Form.Group as={Col} md="1">
                                                <Form.Label htmlFor="status">&nbsp;&nbsp;</Form.Label>
                                                <button className="btn btn-block btn-primary mb-0" type="submit">Buscar<i className="feather icon-search" /></button>
                                            </Form.Group>
                                        </Form.Row>
                                    </ValidationForm>
                                </Col>
                            </Row>
                            <hr></hr>
                            {
                                accesos.find(acceso => acceso.menuId === menuId && acceso.accesoId === 3) ?
                                    <Table striped hover responsive bordered id="mytable">
                                        <thead>
                                            <tr>
                                                <th>Codigo</th>
                                                <th>Base Url</th>
                                                <th>Method</th>
                                                <th>Codigo Estado Http</th>
                                                <th>Resultado</th>
                                                <th>Usuario</th>
                                                <th>Ip Cliente</th>
                                                <th>Fecha</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* {
                                                municipios.map(({ municipioId, descripcion, Departamento: { descripcion: departamento }, Estado: { descripcion: estado } }) => (
                                                    <tr key={municipioId}>
                                                        <td>{municipioId}</td>
                                                        <td>{descripcion}</td>
                                                        <td>{departamento}</td>
                                                        <td>{estado}</td>
                                                    </tr>
                                                ))
                                            } */}
                                        </tbody>
                                    </Table>
                                    : <NoAutorizado />
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}
