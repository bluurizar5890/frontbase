import React from 'react'
import { Col, Form, Modal } from 'react-bootstrap';
import { ValidationForm, TextInput, SelectGroup } from 'react-bootstrap4-form-validation';
import callApi from '../../../helpers/conectorApi';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { useForm } from '../../hooks/useForm';
export const TipoTelefonoUpSert = ({ dataInicial, abrirModal, setAbrirModal,GetTipoTelefono }) => {
    const [values, handleOnChange] = useForm(dataInicial);
    const NuevoRegistro = async () => {
        let response = await callApi('tipotelefono', {
            method: 'POST',
            body: JSON.stringify(values)
        });

        if (response) {
            alert_exitoso("Tipo de Teléfono registrado exitosamente");
            GetTipoTelefono();
            setAbrirModal(false);
        }
    }
    const ActualizarRegistro = async () => {
        let response = await callApi('tipotelefono', {
            method: 'PUT',
            body: JSON.stringify(values)
        });

        if (response) {
            alert_exitoso(response);
            GetTipoTelefono();
        }
        setAbrirModal(false);
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (dataInicial.tipo_telefonoId > 0) {
            await ActualizarRegistro();
        } else {
            await NuevoRegistro();
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
                <Modal.Title as="h5">{dataInicial.tipo_telefonoId > 0 ? 'Actualizar Tipo de Teléfono' : 'Nuevo Tipo de Teléfono'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ValidationForm onSubmit={handleOnSubmit} onErrorSubmit={handleErrorSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="12">
                            <Form.Label htmlFor="descripcion">Descripción</Form.Label>
                            <TextInput
                                name="descripcion"
                                id="descripcion"
                                required
                                value={values.descripcion}
                                onChange={handleOnChange}
                                errorMessage={errorMessage}
                                placeholder="Descripción"
                                autoComplete="off"
                                style={{ textTransform: textTransform }}
                                type="text"
                            />
                        </Form.Group>
                        {
                            dataInicial.tipo_telefonoId > 0 &&
                            <Form.Group as={Col} md="12">
                                <Form.Label htmlFor="estadoId">Estado</Form.Label>
                                <SelectGroup
                                    name="estadoId"
                                    id="estadoId"
                                    value={values.estadoId}
                                    required
                                    errorMessage={errorMessage}
                                    onChange={handleOnChange}>
                                    <option value="">Seleccione un estado</option>
                                    <option value="1">Activo</option>
                                    <option value="2">Inactivo</option>
                                </SelectGroup>
                            </Form.Group>
                        }
                        <div className="col-sm-3"></div>
                        <div className="col-sm-3">
                            <button type="button" onClick={() => { setAbrirModal(false) }} className="btn btn-warning"> Cancelar</button>
                        </div>
                        <div className="col-sm-3">
                            <button type="submit" className="btn btn-success"> {dataInicial.tipo_telefonoId > 0 ? 'Actualizar' : 'Registrar'}</button>
                        </div>
                    </Form.Row>
                </ValidationForm>
            </Modal.Body>
        </Modal>
    )
}
