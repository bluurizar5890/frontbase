import React, { useState } from 'react'
import { Row, Col, Card, Form, Modal, Button, Table } from 'react-bootstrap';
import { ValidationForm, TextInput, SelectGroup } from 'react-bootstrap4-form-validation';
import callApi from '../../../helpers/conectorApi';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { useForm } from '../../hooks/useForm';
export const IdentificacionRegistrar = ({ personaId,abrirModal, setAbrirModal, catTipoDocumento }) => {
    const [tipoDocumento, handleOnChange] = useForm({
        personaId,
        tipo_documentoId: '',
        numero_identificacion: ''
    });

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let response = await callApi('persona/identificacion', {
            method: 'POST',
            body: JSON.stringify(tipoDocumento)
        });

        if (response) {
            alert_exitoso("Documento de identificación registrado exitosamente");
        }
    }

    const handleErrorSubmit = (e, formData, errorInputs) => {
            alert_warning("Por favor complete toda la información solicitada por el formulario");        
    };

    const errorMessage = "Campo obligatorio";
    const textTransform = 'capitalize';
    return (
        <Modal show={abrirModal} onHide={() => setAbrirModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title as="h5">Nuevo Documento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <ValidationForm onSubmit={handleOnSubmit} onErrorSubmit={handleErrorSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="12">
                            <Form.Label htmlFor="tipo_documentoId">Tipo Identificación</Form.Label>
                            <SelectGroup
                                name="tipo_documentoId"
                                id="tipo_documentoId"
                                required
                                value={tipoDocumento.tipo_documentoId}
                                onChange={handleOnChange}
                                errorMessage={errorMessage}>
                                <option value="">Seleccione un tipo de identificación</option>
                                {
                                    catTipoDocumento.map(item => {
                                        return (
                                            <option value={item.tipo_documentoId} key={item.tipo_documentoId}>{item.descripcion}</option>
                                        )
                                    })
                                }
                            </SelectGroup>
                        </Form.Group>

                        <Form.Group as={Col} md="12">
                            <Form.Label htmlFor="numero_identificacion">Número de Identificación</Form.Label>
                            <TextInput
                                name="numero_identificacion"
                                id="numero_identificacion"
                                required
                                value={tipoDocumento.numero_identificacion}
                                onChange={handleOnChange}
                                errorMessage={errorMessage}
                                placeholder="Número de identificación"
                                autoComplete="off"
                            />
                        </Form.Group>
                        <div className="col-sm-3"></div>
                        <div className="col-sm-3">
                            <button type="button" onClick={()=>{setAbrirModal(false)}} className="btn btn-warning"> Cancelar</button>
                        </div>
                        <div className="col-sm-3">
                            <button type="submit" className="btn btn-success"> Registrar</button>
                        </div>
                    </Form.Row>
                </ValidationForm>
            </Modal.Body>
        </Modal>
    )
}
