import React, { useEffect, useState } from 'react'
import { Table, Form, Modal } from 'react-bootstrap';
import callApi from '../../../helpers/conectorApi';
import { alert_exitoso } from '../../../helpers/Notificacion';
export const UsuarioRol = ({ usuarioId, abrirModal, setAbrirModal, catRol }) => {
    const [catRolesAsignados, setRolesAsignados] = useState([]);
    const NuevoRegistro = async (data) => {
        let response = await callApi('usuario/rol', {
            method: 'POST',
            body: JSON.stringify(data)
        });

        if (response) {
            alert_exitoso("Perfil Asignado exitosamente");
            GetRolesAsignados(usuarioId);
        }
    }
    const ActualizarRegistro = async (data) => {
        let response = await callApi('usuario/rol', {
            method: 'PUT',
            body: JSON.stringify(data)
        });

        if (response) {
            alert_exitoso(response);
            GetRolesAsignados(usuarioId);
        }
    }

    const handleChangeChecbox = async (usuario_rolId, rolId, estadoId) => {
        if (usuario_rolId === 0) {
            const data = {
                usuarioId,
                rolId,
                estadoId: 1
            };

            await NuevoRegistro(data);
        } else if (usuario_rolId > 0) {
            let estadoAux = 3;
            if (estadoId === 1) {
                estadoAux = 2;
            } else if (estadoId === 2) {
                estadoAux = 1;
            }
            const data = {
                usuario_rolId,
                estadoId: estadoAux
            };
            await ActualizarRegistro(data);
        }
    }
    const GetRolesAsignados = async (id) => {
        let response = await callApi(`usuario/rol?usuarioId=${id}&estadoId=1;2`);
        if (response) {
            setRolesAsignados(response);
        }
    }

    useEffect(() => {
        GetRolesAsignados(usuarioId);
    }, [usuarioId]);

    return (
        <Modal show={abrirModal} onHide={() => setAbrirModal(false)} size="lg">
            <Modal.Header closeButton>
                <Modal.Title as="h5">Perfiles</Modal.Title>
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
                            catRol.map(({ rolId, nombre }) => {
                                const filaRol = catRolesAsignados.find(item => item.rolId === rolId);
                                let asignado = false;
                                const { usuario_rolId = 0, estadoId = 0 } = !!filaRol && filaRol;
                                if (estadoId === 1) {
                                    asignado = true;
                                }
                                return (
                                    <tr key={rolId}>
                                        <td>{rolId}</td>
                                        <td>{nombre}</td>
                                        {
                                            (estadoId === 1 || estadoId === 2) ?
                                            <>
                                                <td style={{ textAlign: "center" }}>
                                                    <Form.Group>
                                                        <div className="switch switch-alternative d-inline m-r-10">
                                                            <Form.Control type="checkbox" id={`rolId_${rolId}`} checked={asignado} onChange={() => { handleChangeChecbox(usuario_rolId, rolId, estadoId); }} />
                                                            <Form.Label htmlFor={`rolId_${rolId}`} className="cr" />
                                                        </div>
                                                        <Form.Label htmlFor={`rolId_${rolId}`}>{
                                                            asignado ? 'Activo' : 'Inactivo'
                                                        }</Form.Label>
                                                    </Form.Group>
                                                </td>
                                            </>
                                            :
                                            <td style={{ textAlign: "center" }}>
                                            <Form.Group>
                                                <div className="switch switch-alternative d-inline m-r-10">
                                                    <Form.Control type="checkbox" id={`rolId_${rolId}`} checked={asignado} onChange={() => { handleChangeChecbox(usuario_rolId, rolId, estadoId); }} />
                                                    <Form.Label htmlFor={`rolId_${rolId}`} className="cr" />
                                                </div>
                                                <Form.Label htmlFor={`rolId_${rolId}`}>Asignar Perfil</Form.Label>
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
