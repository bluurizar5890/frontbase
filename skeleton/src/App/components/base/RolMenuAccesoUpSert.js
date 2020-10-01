import React,{useEffect, useState} from 'react'
import { Col, Form, Modal } from 'react-bootstrap';
import { ValidationForm,  SelectGroup } from 'react-bootstrap4-form-validation';
import { useSelector } from 'react-redux';
import callApi from '../../../helpers/conectorApi';
import { alert_exitoso, alert_warning } from '../../../helpers/Notificacion';
import { useForm } from '../../hooks/useForm';
const menuIdMenuAcceso=19;
export const RolMenuAccesoUpSert = ({ dataInicial, abrirModal, setAbrirModal, catMenu,GetRolMenuAcceso,rolMenuAcceso }) => {
    const state = useSelector(state => state);
    const [accesos, setAccesos] = useState([]);
    const [values, handleOnChange] = useForm(dataInicial);
    const [menuId, setMenuid] = useState(dataInicial.menuId);
    const [menuAcceso, setMenuAcceso] = useState([]);

    const GetAccesosByMenuId = () => {
        if (state?.accesos) {
            const { accesos } = state;
            const misAccesos = accesos.filter(item => (item.menuId === menuIdMenuAcceso));
            setAccesos(misAccesos);
        }
    }

    const NuevoRegistro = async () => {
        let response = await callApi('rolmenuacceso', {
            method: 'POST',
            body: JSON.stringify(values)
        });

        if (response) {
            alert_exitoso("Permiso registrado exitosamente");
            GetRolMenuAcceso(dataInicial.rolId);
            setAbrirModal(false);
        }
    }
    const ActualizarRegistro = async () => {
        let response = await callApi('rolmenuacceso', {
            method: 'PUT',
            body: JSON.stringify(values)
        });

        if (response) {
            alert_exitoso(response);
            GetRolMenuAcceso(dataInicial.rolId);
        }
        setAbrirModal(false);
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (dataInicial.rol_menu_accesoId > 0) {
            await ActualizarRegistro();
        } else {
            await NuevoRegistro();
        }
    }
    const handleErrorSubmit = (e, formData, errorInputs) => {
        alert_warning("Por favor complete toda la información solicitada por el formulario");
    };

    const handleMenuSeleccionado=({target:{value}})=>{
        setMenuid(value);
    }

    const GetMenuAcceso = async (id) => {
        if (accesos.find(acceso => acceso.menuId === menuIdMenuAcceso && acceso.accesoId === 3)) {
        let response = await callApi(`menuacceso?menuId=${id}&estadoId=1`);
        let auxMenuAcceso=[];
        if (response) {
            response.map(({menu_accesoId,cat_acceso:{descripcion}})=>{
                const existe=rolMenuAcceso.find(i=>i.menu_accesoId===menu_accesoId && (i.estadoId===1 || i.estadoId===2) && i.menu_accesoId!==dataInicial.menu_accesoId);
                if(!existe){
                let aux={
                    menu_accesoId,
                    descripcion
                }
                auxMenuAcceso.push(aux);
            }
            });
            setMenuAcceso(auxMenuAcceso);
        }
    }else{
        setMenuAcceso([{ menu_accesoId: '', descripcion: 'No esta autorizado' }]);
    }
    }

    useEffect(() => {
        GetAccesosByMenuId();
    }, []);
    useEffect(() => {
        GetMenuAcceso(menuId);
    }, [menuId,accesos])

    const errorMessage = "Campo obligatorio";
    return (
        <Modal show={abrirModal} onHide={() => setAbrirModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title as="h5">{dataInicial.rol_menu_accesoId > 0 ? 'Actualizar Permiso' : 'Nuevo Permiso'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ValidationForm onSubmit={handleOnSubmit} onErrorSubmit={handleErrorSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="12">
                            <Form.Label htmlFor="menuId">Menu</Form.Label>
                            <SelectGroup
                                name="menuId"
                                id="menuId"
                                value={menuId}
                                required
                                errorMessage={errorMessage}
                                onChange={handleMenuSeleccionado}>
                                <option value="">Seleccione un menu</option>
                                {
                                    catMenu.map(({ menuId, descripcion }) => (
                                        <option value={menuId} key={menuId}>{descripcion}</option>
                                    ))
                                }
                            </SelectGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="12">
                            <Form.Label htmlFor="menu_accesoId">Acceso</Form.Label>
                            <SelectGroup
                                name="menu_accesoId"
                                id="menu_accesoId"
                                value={values.menu_accesoId}
                                required
                                errorMessage={errorMessage}
                                onChange={handleOnChange}>
                                <option value="">Seleccione un permiso</option>
                                {
                                    menuAcceso.map(({ menu_accesoId, descripcion }) => (
                                        <option value={menu_accesoId} key={menu_accesoId}>{descripcion}</option>
                                    ))
                                }
                            </SelectGroup>
                        </Form.Group>
                        {
                            dataInicial.rol_menu_accesoId > 0 &&
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
                            <button type="submit" className="btn btn-success"> {dataInicial.rol_menu_accesoId > 0 ? 'Actualizar' : 'Registrar'}</button>
                        </div>
                    </Form.Row>
                </ValidationForm>
            </Modal.Body>
        </Modal>
    )
}
