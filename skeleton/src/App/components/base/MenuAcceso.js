import React, { useEffect, useState } from 'react'
import { Table, Form, Modal } from 'react-bootstrap';
import callApi from '../../../helpers/conectorApi';
import { alert_exitoso } from '../../../helpers/Notificacion';
export const MenuAcceso = ({ menuId, abrirModal, setAbrirModal, catAcceso, GetCatMenu }) => {
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
                            <th>Estado</th>
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
                                                            <Form.Control type="checkbox" id={`accesoid_${accesoId}`} checked={asignado} onChange={() => { handleChangeChecbox(menu_accesoId, accesoId, estadoId); }} />
                                                            <Form.Label htmlFor={`accesoid_${accesoId}`} className="cr" />
                                                        </div>
                                                        <Form.Label htmlFor={`accesoid_${accesoId}`}>{
                                                            asignado ? 'Activo' : 'Inactivo'
                                                        }</Form.Label>
                                                    </Form.Group>
                                                </td>
                                            </>
                                            :
                                            <td style={{ textAlign: "center" }}>
                                            <Form.Group>
                                                <div className="switch switch-alternative d-inline m-r-10">
                                                    <Form.Control type="checkbox" id={`accesoid_${accesoId}`} checked={asignado} onChange={() => { handleChangeChecbox(menu_accesoId, accesoId, estadoId); }} />
                                                    <Form.Label htmlFor={`accesoid_${accesoId}`} className="cr" />
                                                </div>
                                                <Form.Label htmlFor={`accesoid_${accesoId}`}>Asignar acceso a menu</Form.Label>
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
