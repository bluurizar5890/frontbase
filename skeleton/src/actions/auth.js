import callApi from '../helpers/conectorApi';
import * as actionTypes from '../store/actions';

export const loginBackend = (user_name, password) => {
    return async(dispatch) => {
        let values={
            user_name:'blopez',
            password:'12354'
        }
        let data = await callApi('auth', {
            method: 'POST',
            body: JSON.stringify(values)
        });
            if(data){
                const {token,accesos}=data;
                dispatch(login(token, accesos));
            }
    }
}

const login = (token, accesos) => ({
    type: actionTypes.LOGIN,
    payload: {
        token,
        accesos
    }
});