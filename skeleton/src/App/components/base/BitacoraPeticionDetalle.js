
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import callApi from '../../../helpers/conectorApi';
import Prism from '../../components/Prism';
export const BitacoraPeticionDetalle = ({ dataInicial, abrirModal, setAbrirModal }) => {
    const [infoDetalle, setInfoDetalle] = useState({});
    const GetDetalle = async () => {
        let response = await callApi(`bitacora/peticiones/${dataInicial.tipo}/${dataInicial.id}`);
        if (response) {
            setInfoDetalle(response);
        }
    }
    useEffect(() => {
        GetDetalle();
    }, []);
    return (
        <Modal show={abrirModal} onHide={() => setAbrirModal(false)} size="xl">
            <Modal.Header closeButton>
                <Modal.Title as="h5">Detalle de Petición</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    infoDetalle &&
                    <Prism code={JSON.stringify(infoDetalle, null, 3)} language="json" />
                    // <pre> {JSON.stringify(infoDetalle, null, 3)} </pre>
                }
            </Modal.Body>
        </Modal>
    )
}
