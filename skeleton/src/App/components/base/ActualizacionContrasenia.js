import React, { useState } from 'react';
import Aux from '../../../hoc/_Aux';
import { Col, Form } from 'react-bootstrap';
import logoDark from './../../../assets/images/auth/auth-logo-dark.png'
import '../../../assets/scss/style.scss';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import { useForm } from '../../hooks/useForm';
import callApi from '../../../helpers/conectorApi';
import validator from 'validator';
import { useDispatch } from 'react-redux';
import { updatePassWord } from '../../../actions/auth';
const ActualizacionContrasenia = ({ history,inModal=false,setAbrirModal }) => {
    const dispatch = useDispatch();

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
        let response = await callApi('usuario/actualizarpassword', {
            method: 'PUT',
            body: JSON.stringify(values)
        });
        if(response){
            alert_exitoso(response);
            dispatch(updatePassWord());
            if(inModal===true){
                setAbrirModal(false);
            }else{
            history.replace("/sample-page");
            }
        }
    }
   const confirmarPassWord = (value) => {
        return value && value === values.password_nuevo;
    };
    const handleErrorSubmit = (e, formData, errorInputs) => {
        alert_warning("Por favor complete la información solicitada");
    };
    return (
        <Aux>
            <div className={inModal===true?"":"auth-wrapper"}>
                <div className={inModal===true?"":"blur-bg-images"} />
                <div className={inModal===true?"":"auth-content"}>
                    <div className={inModal===true?"":"card"}>
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
                                                type="password"
                                                placeholder="Nueva Contraseña"
                                                required
                                                pattern="(?=.*[A-Z]).{6,}"
                                                errorMessage={{required:"Ingrese la nueva contraseña", pattern: "La contraseña debe de tener al menos 6 caracteres y contener al menos una letra mayúscula"}}
                                                value={values.password_nuevo}
                                                onChange={hanldeOnChangePassword}
                                                autoComplete="off"
                                            />
                                        </Form.Group>
                                  
                                        <Form.Group as={Col} md="12">
                                            <TextInput
                                                name="password_confirmar"
                                                id="password_confirmar"
                                                type="password"
                                                placeholder="Confirmar Nueva Contraseña"
                                                required
                                                validator={confirmarPassWord}
                                                errorMessage={{required:"Por favor confirme la nueva contraseña", validator: "La contraseña no coincide"}}
                                                value={values.password_confirmar}
                                                onChange={hanldeOnChangePassword}
                                                autoComplete="off"
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