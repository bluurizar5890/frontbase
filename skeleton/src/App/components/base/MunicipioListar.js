import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { ValidationForm, TextInput, SelectGroup } from 'react-bootstrap4-form-validation';
import Swal from 'sweetalert2';
import callApi from '../../../helpers/conectorApi';
import Aux from '../../../hoc/_Aux';
import withReactContent from 'sweetalert2-react-content';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { MunicipioUpSert } from './MunicipioUpSert';


const accesos = [1, 2, 3, 4];
export const MunicipioListar = () => {

    const [abrirModal, setAbrirModal] = useState(false);
    const [catPaises, setCatPais] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const initData = {
        departamentoId: '',
        paisId: '',
        descripcion: '',
        municipioId_depto:'',
        estadoId: 1
    };

    const [dataInicial, setdataInicial] = useState(initData);
    const handleOpenModal = () => {
        setAbrirModal(true);
        setdataInicial(initData);
    }
    const GetPaises = async () => {
        let response = await callApi('pais?include=0?estadoId=1');
        setCatPais(response);

    }
    const GetDepartamentos = async (id) => {
        let response = await callApi(`departamento?paisId=${id}&estadoId=1&include=0`);
        setDepartamentos(response);
    }
    const GetMunicipios = async (id) => {
        if(id>0){
        let response = await callApi(`municipio?departamentoId=${id}&estadoId=1;2`);
        setMunicipios(response);
        }
    }
    
    const handleChangePais=({target:{value}})=>{
        GetDepartamentos(value);
        setMunicipios([]);
    }
    const handleChageDepartamento=({target:{value}})=>{
        GetMunicipios(value);
    }
    const handleEditar = (id) => {
        const { municipioId, departamentoId, municipioId_depto,descripcion, estadoId } = municipios.find(item => item.municipioId === id);
        const {paisId}=departamentos.find(item=>item.departamentoId===departamentoId);
        setdataInicial({
            municipioId,
            departamentoId,
            municipioId_depto,
            descripcion,
            paisId,
            estadoId
        });
        setAbrirModal(true);
    }
    const handleDelete = (id) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: 'Alerta?',
            text: 'Esta seguro que desea eliminar el elemento',
            type: 'warning',
            showCloseButton: true,
            showCancelButton: true
        }).then(async (willDelete) => {
            if (willDelete.value) {
                let method = 'DELETE';
                let response = await callApi(`municipio/${id}`, {
                    method
                });
                if (response) {
                    alert_exitoso(response);
                    let muns=municipios.filter(item=>item.municipioId!==id);
                    setMunicipios(muns);
                }
            } else {
                alert_warning('No se eliminó ningun elemento');
            }
        });
    }
    useEffect(() => {
        GetPaises();
    }, [])

    return (
        <Aux>
            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Municipios</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row className="align-items-center m-l-0">
                            <Col>
                                <ValidationForm onSubmit={GetDepartamentos} onErrorSubmit={GetDepartamentos}>
                                    <Form.Row>
                                    <Form.Group as={Col} md="6">
                                            <Form.Label htmlFor="paisId">Pais</Form.Label>
                                            <SelectGroup 
                                                onChange={handleChangePais}
                                                name="paisId"
                                                id="paisId"
                                                errorMessage="Seleccione un Pais"
                                                required>
                                                        <option value="">Seleccione un Pais</option>
                                                {
                                                    catPaises.map(({paisId,descripcion})=>(
                                                    <option value={paisId} key={paisId}>{descripcion}</option>
                                                    ))
                                                }
                                            </SelectGroup>
                                       
                                        </Form.Group>
                                        <Form.Group as={Col} md="6">
                                            <Form.Label htmlFor="departamentoId">Departamento</Form.Label>
                                            <SelectGroup
                                                onChange={handleChageDepartamento}
                                                name="departamentoId"
                                                id="departamentoId"
                                                errorMessage="Seleccione un Departamento"
                                                required>
                                                    <option value="">Seleccione un Departamento</option>
                                                {
                                                    departamentos.map(({departamentoId,descripcion})=>(
                                                    <option value={departamentoId} key={departamentoId}>{descripcion}</option>
                                                    ))
                                                }
                                            </SelectGroup>
                                        </Form.Group>
                                    </Form.Row>
                                </ValidationForm>
                                </Col>
                            </Row>
                            <Row className="align-items-center m-l-0">
                            <Col/> 
                            <Col className="text-right" md="2">
                                    {
                                        accesos.find(acceso => acceso === 1) &&
                                        <Button variant="success" className="btn-sm btn-round has-ripple" onClick={handleOpenModal}><i className="feather icon-plus" /> Agregar Municipio</Button>
                                    }
                                </Col>
                            </Row>
                            <hr></hr>
                            {
                                accesos.find(acceso => acceso === 2) &&
                                <Table striped hover responsive bordered id="mytable">
                                    <thead>
                                        <tr>
                                            <th>Codigo</th>
                                            <th>Municipio</th>
                                            <th>Departamento</th>
                                            <th>Estado</th>
                                            {
                                                accesos.find(acceso => acceso === 3 || acceso === 4) &&
                                                <th></th>
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            municipios.map(({ municipioId, descripcion,cat_departamento:{descripcion:departamento},cat_estado:{descripcion:estado} }) => (
                                                <tr key={municipioId}>
                                                    <td>{municipioId}</td>
                                                    <td>{descripcion}</td>
                                                    <td>{departamento}</td>
                                                    <td>{estado}</td>
                                                    {
                                                        accesos.find(acceso => acceso === 3 || acceso === 4) &&
                                                        <td style={{ textAlign: "center" }}>
                                                            {
                                                                accesos.find(acceso => acceso === 3) &&
                                                                <button className="btn-icon btn btn-info btn-sm" onClick={() => { handleEditar(municipioId) }}><i className="feather icon-edit" /></button>
                                                            }
                                                            {
                                                                accesos.find(acceso => acceso === 4) &&
                                                                <button className="btn-icon btn btn-danger btn-sm" onClick={() => { handleDelete(municipioId) }}><i className="feather icon-trash-2" /></button>
                                                            }
                                                        </td>
                                                    }
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            }
                            {
                                abrirModal === true &&
                                <MunicipioUpSert abrirModal={abrirModal} setAbrirModal={setAbrirModal} catPaises={catPaises} GetMunicipios={GetMunicipios} dataInicial={dataInicial} />
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}
