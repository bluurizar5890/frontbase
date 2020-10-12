
import config from '../config';
import { alert_exitoso, alert_error, alert_info, alert_warning } from './Notificacion';
const BASE_URL = config.urlApi;
const callApi = async (endpoint, options = {}, manejarRespuesta = 0) => {
    try {
        options.headers = {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzdWFyaW9JZCI6MX0sImlhdCI6MTU5ODY0NTkwOH0.D3CbE9CdG_kjliv8F3jjSf4dnNy0BvpqPntYhbfHVXI`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };
        if (endpoint === "/auth") {
            delete options.headers.Authorization;
        }
        const url = BASE_URL + endpoint;
        const response = await fetch(url, options);
        const result = await response.json();

        if (manejarRespuesta === 0) {
            if (result) {
                const { error, status, body } = result;
                if (error === true) {
                    if (body === "Validation error") {
                        alert_error("Ocurrió un error de validación");
                        return false;
                    } else {
                        alert_error("Ocurrió un error al realizar la petición");
                        return false;
                    }
                } else {
                    if (body) {
                        const { code, data } = body;
                        if (code === 0) {
                            alert_warning(data);
                            return false;
                        } else if (code === 1) {
                            return data;
                        } else {
                            alert_error(data);
                            return false;
                        }
                    } else {
                        alert_error("El servicio no retorno información");
                        return false;
                    }
                }
            } else {
                alert_error("Ocurrió un error al realizar la acción");
                return false;
            }
        } else {
            return result;
        }
    } catch (mensajeError) {
        alert_error("Ocurrió un error en el conector, por favor comuniquese con Soporte");
        return false;
    }
}

export default callApi;