import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import callApi from '../../../helpers/conectorApi';
import Aux from '../../../hoc/_Aux';
import withReactContent from 'sweetalert2-react-content';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { DatoExtraUpSert } from './DatoExtraUpSert';
const accesos = [1,2,3,4];
export const DatoExtraListar = ({ personaId }) => {
    const [abrirModal, setAbrirModal] = useState(false);
    const [catTipoSangre, setTipoSangre] = useState([]);
    const [catEstadoCivil, setCatEstadoCivil] = useState([]);
    const [datoExtra, setDatoExtra] = useState([]);
    const initData = {
        personaId,
        tipo_sangreId: '',
        estado_civilId: '',
        estadoId: 1
    };
    const [dataInicial, setdataInicial] = useState(initData);
    const handleOpenModal = () => {
        setAbrirModal(true);
        setdataInicial(initData);
    }
    const GetTipoSangre = async () => {
        let response = await callApi('tiposangre?estadoId=1');
        setTipoSangre(response);
    }
    const GetEstadoCivil = async () => {
        let response = await callApi('estadocivil?estadoId=1');
        setCatEstadoCivil(response);
    }
    const GetDatoExtra = async (id) => {
        let response = await callApi(`persona/datoextra?personaId=${id}&estadoId=1;2`);
        setDatoExtra(response);
    }
    const handleEditar = (id) => {
        const {dato_extra_personaId,tipo_sangreId,estado_civilId,estadoId}= datoExtra.find(item => item.dato_extra_personaId === id);
        setdataInicial({
            dato_extra_personaId,
            tipo_sangreId,
            estado_civilId,
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
                let response = await callApi(`persona/datoextra/${id}`, {
                    method
                });
                if (response) {
                    alert_exitoso(response);
                    GetDatoExtra(personaId);
                }
            } else {
                alert_warning('No se eliminó ningun elemento');
            }
        });
    }
    useEffect(() => {
        GetTipoSangre();
        GetEstadoCivil();
        GetDatoExtra(personaId);
    }, [personaId]);
    return (
        <Aux>
            <Row className='btn-page'>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Información adicional</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row className="align-items-center m-l-0">
                                <Col />
                                <Col className="text-right">
                                    {
                                        (accesos.find(acceso => acceso === 1) && datoExtra.length<=0)&&
                                        <Button variant="success" className="btn-sm btn-round has-ripple" onClick={handleOpenModal}><i className="feather icon-plus" /> Agregar Información adicional</Button>
                                    }
                                </Col>
                            </Row>
                            {
                                accesos.find(acceso => acceso === 2) &&
                                <Table striped hover responsive bordered id="table_dentificaciones_persona">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Tipo de Sangre</th>
                                            <th>Estado Civil</th>
                                            <th>Estado</th>
                                            {
                                                accesos.find(acceso => acceso === 3 || acceso === 4) &&
                                                <th>Opciones</th>
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            datoExtra.map((item) => {
                                                const{ dato_extra_personaId, cat_tipo_sangre,cat_estado_civil,cat_estado: { descripcion: estado } }=item;
                                                const {descripcion:tipoSangre}=!!cat_tipo_sangre && cat_tipo_sangre;
                                                const {descripcion:estadoCivil}=!!cat_estado_civil && cat_estado_civil;
                                                return(
                                                <tr key={dato_extra_personaId}>
                                                    <td>{dato_extra_personaId}</td>
                                                    <td>{tipoSangre}</td>
                                                    <td>{estadoCivil}</td>
                                                    <td>{estado}</td>
                                                    {
                                                        accesos.find(acceso => acceso === 3 || acceso === 4) &&
                                                        <td style={{ textAlign: "right", width: "100px" }}>
                                                            {
                                                                accesos.find(acceso => acceso === 3) &&
                                                                <button className="btn btn-info btn-sm" onClick={() => { handleEditar(dato_extra_personaId) }}><i className="feather icon-edit" />&nbsp;Editar </button>
                                                            }
                                                            {
                                                                accesos.find(acceso => acceso === 4) &&
                                                                <button className="btn btn-danger btn-sm" onClick={() => { handleDelete(dato_extra_personaId) }}><i className="feather icon-trash-2" />&nbsp;Eliminar </button>
                                                            }
                                                        </td>
                                                    }
                                                </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            }
                            {
                                abrirModal === true &&
                                <DatoExtraUpSert abrirModal={abrirModal} setAbrirModal={setAbrirModal} catTipoSangre={catTipoSangre} catEstadoCivil={catEstadoCivil} personaId={personaId} GetDatoExtra={GetDatoExtra} dataInicial={dataInicial} />
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}
