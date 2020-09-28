import React, { useEffect, useState } from 'react'
import { Table, Form, Modal } from 'react-bootstrap';
import callApi from '../../../helpers/conectorApi';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
export const MenuAcceso = ({ menuId, abrirModal, setAbrirModal, catAcceso, GetCatMenu }) => {
    console.log("2");
    const [catAccesosAsignados, setCatAccesosAsignado] = useState([]);
    const NuevoRegistro = async (data) => {
        let response = await callApi('menuacceso', {
            method: 'POST',
            body: JSON.stringify(data)
        });

        if (response) {
            alert_exitoso("Acceso asignado exitosamente");
            GetAccesosAsignado(menuId);
        }
    }
    const ActualizarRegistro = async (data) => {
        let response = await callApi('menuacceso', {
            method: 'PUT',
            body: JSON.stringify(data)
        });

        if (response) {
            alert_exitoso(response);
            GetAccesosAsignado(menuId);
        }
    }

    const handleChangeChecbox = async (menu_accesoId, accesoId, estadoId) => {
        if (menu_accesoId === 0) {
            const data = {
                menuId,
                accesoId,
                estadoId: 1
            };

            await NuevoRegistro(data);
        } else if (menu_accesoId > 0) {
            let estadoAux = 3;
            if (estadoId === 1) {
                estadoAux = 2;
            } else if (estadoId === 2) {
                estadoAux = 1;
            }
            const data = {
                menu_accesoId,
                accesoId,
                estadoId: estadoAux
            };
            await ActualizarRegistro(data);
        }
    }
    const GetAccesosAsignado = async (id) => {
        let response = await callApi(`menuacceso?menuId=${id}&estadoId=1;2`);
        if (response) {
            setCatAccesosAsignado(response);
        }
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
                let response = await callApi(`menu/${id}`, {
                    method
                });
                if (response) {
                    alert_exitoso(response);
                    let listActual = catAccesosAsignados.filter(item => item.menu_accesoId !== id);
                    setCatAccesosAsignado(listActual);
                }
            } else {
                alert_warning('No se eliminó ningun elemento');
            }
        });
    }


    useEffect(() => {
        GetAccesosAsignado(menuId);
    }, [menuId]);

    return (
        <Modal show={abrirModal} onHide={() => setAbrirModal(false)} size="lg">
            <Modal.Header closeButton>
                <Modal.Title as="h5">Accesos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped hover responsive bordered id="mytable">
                    <thead>
                        <tr>
                            <th>Codigo acceso</th>
                            <th>Acceso</th>
                            <th>Asignado</th>
                            <th></th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            catAcceso.map(({ accesoId, descripcion }) => {
                                const filaAcceso = catAccesosAsignados.find(item => item.accesoId === accesoId);

                                let asignado = false;
                                const { menu_accesoId = 0, estadoId = 0 } = !!filaAcceso && filaAcceso;
                                if (estadoId === 1) {
                                    asignado = true;
                                }
                                return (
                                    <tr key={accesoId}>
                                        <td>{accesoId}</td>
                                        <td>{descripcion}</td>
                                        {
                                            (estadoId === 1 || estadoId === 2) ?
                                            <>
                                                <td style={{ textAlign: "center" }}>
                                                    <Form.Group>
                                                        <div className="switch switch-alternative d-inline m-r-10">
                                                            <Form.Control type="checkbox" id="checked-alternative" checked={asignado} onChange={() => { handleChangeChecbox(menu_accesoId, accesoId, estadoId); }} />
                                                            <Form.Label htmlFor="checked-alternative" className="cr" />
                                                        </div>
                                                        <Form.Label>{
                                                            asignado ? 'Activo' : 'Inactivo'
                                                        }</Form.Label>
                                                    </Form.Group>
                                                </td>
                                                <td style={{ textAlign: "center" }}>

                                                    <button className="btn-icon btn btn-danger btn-sm" onClick={()=>{handleDelete(menu_accesoId)}} ><i className="feather icon-trash-2" /></button>
                                                </td>
                                            </>
                                            :
                                            <td style={{ textAlign: "center" }} colSpan="2">
                                            <Form.Group>
                                                <div className="switch switch-alternative d-inline m-r-10">
                                                    <Form.Control type="checkbox" id="checked-alternative" checked={asignado} onChange={() => { handleChangeChecbox(menu_accesoId, accesoId, estadoId); }} />
                                                    <Form.Label htmlFor="checked-alternative" className="cr" />
                                                </div>
                                                <Form.Label>Asignar acceso a menu</Form.Label>
                                            </Form.Group>
                                        </td>
                                        }
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </Table>

            </Modal.Body>
        </Modal>
    )
}
