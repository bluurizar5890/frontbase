import callApi from '../helpers/conectorApi';
import * as actionTypes from '../store/actions';
import Cookies from 'js-cookie'

var inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);

export const loginBackend = (infoLogin) => {
    return async(dispatch) => {
        let data = await callApi('auth', {
            method: 'POST',
            body: JSON.stringify(infoLogin)
        });
            if(data){
                const {token,userInfo}=data;
                Cookies.set("auth",btoa(token),{ expires: inFifteenMinutes});
                const accesos=await GetAccesos();
                const menu=await GetMenu();
                dispatch(login(token,userInfo ,accesos,menu));
            }
    }
}

export const UpdateAcesosMenu=()=>{
    return async(dispatch)=>{
        const accesos=await GetAccesos();
        const menu=await GetMenu();
        dispatch(updatePermisoYMenu(accesos,menu));
    }
}

const login = (token,userInfo, accesos,menu) => ({
    type: actionTypes.LOGIN,
    payload: {
        token,
        userInfo,
        accesos,
        menu,
        logged:true
    }
});

export const updatePassWord = () => ({
    type: actionTypes.CAMBIO_PASSWORD
});

export const logout = () => ({
    type: actionTypes.LOGOUT
});


const updatePermisoYMenu=(accesos,menu)=>({
    type: actionTypes.ACTUALIZAR_PERMISOS_MENU,
    payload: {
        accesos,
        menu
    }
});

const GetAccesos=async()=>{
    let accesos=await callApi('rolmenuacceso/accesos');
    if(accesos){
        return accesos;
    }else{
        return [];
    }
}

const GetMenu=async()=>{
    let menu=await callApi('menu/mimenu');
    if(menu){
        return menu;
    }else{
        return [];
    }
}