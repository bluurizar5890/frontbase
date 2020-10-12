import React from 'react';
import Aux from '../../../hoc/_Aux';
import { Col, Form } from 'react-bootstrap';
import logoDark from './../../../assets/images/auth/auth-logo-dark.png'
import '../../../assets/scss/style.scss';
import { alert_warning } from '../../../helpers/Notificacion';
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import { useForm } from '../../hooks/useForm';
const ActualizacionContrasenia = () => {
    const [values, , , setValues] = useForm({
        password_actual: '',
        password_nuevo: '',
        password_confirmar: ''
    });
    const hanldeOnChangePassword = ({ target: { name, value } }) => {
        setValues({ ...values, [name]: value });
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
    }
    const handleErrorSubmit = (e, formData, errorInputs) => {
        alert_warning("Por favor complete la información solicitada");
    };
    return (
        <Aux>
            <div className="auth-wrapper">
                <div className="blur-bg-images" />
                <div className="auth-content">
                    <div className="card">
                        <div className="row align-items-center">
                            <div className="col-md-12">
                                <div className="card-body">
                                    <img src={logoDark} alt="" className="img-fluid mb-4" />
                                    <h4 className="mb-4 f-w-400">Actualizar Contraseña</h4>
                                    <ValidationForm onSubmit={handleOnSubmit} onErrorSubmit={handleErrorSubmit}>
                                        <Form.Row>
                                            <Form.Group as={Col} md="12">
                                                <TextInput
                                                    name="password_actual"
                                                    id="password_actual"
                                                    required
                                                    errorMessage="Por favor ingrese su contraseña actual"
                                                    value={values.password_actual}
                                                    onChange={hanldeOnChangePassword}
                                                    placeholder="Contraseña Actual"
                                                    autoComplete="off"
                                                    type="password"
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="12">
                                                <TextInput
                                                    name="password_nuevo"
                                                    id="password_nuevo"
                                                    required
                                                    value={values.password_nuevo}
                                                    onChange={hanldeOnChangePassword}
                                                    errorMessage="Por favor ingrese su nueva contraseña"
                                                    placeholder="Nueva Contraseña"
                                                    autoComplete="off"
                                                    type="password"
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="12">
                                                <TextInput
                                                    name="password_confirmar"
                                                    id="password_confirmar"
                                                    required
                                                    value={values.password_confirmar}
                                                    onChange={hanldeOnChangePassword}
                                                    errorMessage="Por favor confirme la nueva contraseña"
                                                    placeholder="Confirmar Nueva Contraseña"
                                                    autoComplete="off"
                                                    type="password"
                                                />
                                            </Form.Group>
                                        </Form.Row>
                                        <button className="btn btn-block btn-primary mb-4" type="submit">Actualizar</button>
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

export default ActualizacionContrasenia;