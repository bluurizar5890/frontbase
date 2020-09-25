import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import callApi from '../../../helpers/conectorApi';
import Aux from '../../../hoc/_Aux';
import withReactContent from 'sweetalert2-react-content';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { PaisUpSert } from './PaisUpSert';
const accesos = [1, 2, 3, 4];
export const PaisListar = () => {
    const [abrirModal, setAbrirModal] = useState(false);
    const [paises, setPaises] = useState([]);
    const initData = {
        paisId: '',
        descripcion: '',
        nacionalidad:'',
        estadoId: 1
    };
    const [dataInicial, setdataInicial] = useState(initData);
    const handleOpenModal = () => {
        setAbrirModal(true);
        setdataInicial(initData);
    }
    
    const GetPaises = async () => {
        let response = await callApi(`pais?estadoId=1;2`);
        setPaises(response);
    }
    const handleEditar = (id) => {
        const { paisId, descripcion, nacionalidad, estadoId } = paises.find(item => item.paisId === id);
        setdataInicial({
            paisId,
            descripcion,
            nacionalidad,
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
                let response = await callApi(`pais/${id}`, {
                    method
                });
                if (response) {
                    alert_exitoso(response);
                    GetPaises();
                }
            } else {
                alert_warning('No se eliminó ningun elemento');
            }
        });
    }
    useEffect(() => {
        GetPaises();
    }, []);
    return (
        <Aux>
            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Pais</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row className="align-items-center m-l-0">
                                <Col />
                                <Col className="text-right">
                                    {
                                        accesos.find(acceso => acceso === 1) &&
                                        <Button variant="success" className="btn-sm btn-round has-ripple" onClick={handleOpenModal}><i className="feather icon-plus" /> Agregar Pais</Button>
                                    }
                                </Col>
                            </Row>
                            {
                                accesos.find(acceso => acceso === 2) &&
                                <Table striped hover responsive bordered id="table_dentificaciones_persona">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Nombre</th>
                                            <th>Nacionalidad</th>
                                            <th>Estado</th>
                                            {
                                                accesos.find(acceso => acceso === 3 || acceso === 4) &&
                                                <th></th>
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            paises.map(({ paisId, descripcion, nacionalidad, cat_estado:{descripcion:estado}  }) => (
                                                <tr key={paisId}>
                                                    <td>{paisId}</td>
                                                    <td>{descripcion}</td>
                                                    <td>{nacionalidad}</td>
                                                    <td>{estado}</td>
                                                    {
                                                        accesos.find(acceso => acceso === 3 || acceso === 4) &&
                                                        <td style={{ textAlign: "center"}}>
                                                            {
                                                                accesos.find(acceso => acceso === 3) &&
                                                                <button className="btn-icon btn btn-info btn-sm" onClick={() => { handleEditar(paisId) }}><i className="feather icon-edit" /></button>
                                                            }
                                                            {
                                                                accesos.find(acceso => acceso === 4) &&
                                                                <button className="btn-icon btn btn-danger btn-sm" onClick={() => { handleDelete(paisId) }}><i className="feather icon-trash-2" /></button>
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
                                <PaisUpSert abrirModal={abrirModal} setAbrirModal={setAbrirModal} GetPaises={GetPaises} dataInicial={dataInicial} />
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}
