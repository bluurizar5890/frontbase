import React, { useState } from 'react'
import Aux from '../../../hoc/_Aux'
import logoDark from './../../../assets/images/auth/auth-logo-dark.png'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import { Col, Form } from 'react-bootstrap';
import { alert_warning } from '../../../helpers/Notificacion';
export const ResetPassword = () => {
    const handleOnSubmit = async (e) => {
        e.preventDefault();
    }
    const [email, setEmail] = useState('');
    const handleErrorSubmit = (e, formData, errorInputs) => {
        alert_warning("Por favor complete la información solicitada");
    };
    return (
        <Aux>
            <div className="auth-wrapper">
                <div className="auth-content">
                    <div className="card">
                        <div className="row align-items-center text-center">
                            <div className="col-md-12">
                                <div className="card-body">
                                    <img src={logoDark} alt="" className="img-fluid mb-4" />
                                    <h4 className="mb-3 f-w-400">Restablecer Contraseña</h4>
                                    <ValidationForm onSubmit={handleOnSubmit} onErrorSubmit={handleErrorSubmit}>
                                        <Form.Row>
                                            <Form.Group as={Col} md="12">
                                                <TextInput
                                                    name="email"
                                                    id="email"
                                                    required
                                                    errorMessage="Por favor ingrese el correo electrónico registrado"
                                                    value={email}
                                                    onChange={({ target: { value } }) => { setEmail(value) }}
                                                    placeholder="Correo electrónico registrado"
                                                    autoComplete="off"
                                                    type="email"
                                                />
                                            </Form.Group>
                                        </Form.Row>
                                        <button className="btn btn-block btn-primary mb-4">Restablecer</button>
                                    </ValidationForm>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
    )
}
