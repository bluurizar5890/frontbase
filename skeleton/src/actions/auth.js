import callApi from '../helpers/conectorApi';
import * as actionTypes from '../store/actions';


export const loginBackend = (user_name, password) => {
    return async(dispatch) => {
        let values={
            user_name:'blopez',
            password:'blopez',
            accesos:true,
            menu:true,
            userInfo:true
        }
        let data = await callApi('auth', {
            method: 'POST',
            body: JSON.stringify(values)
        });
            if(data){
                const {token,userInfo}=data;
                const accesos=await GetAccesos();
                const menu=await GetMenu();
                dispatch(login(token,userInfo ,accesos,menu));
            }
    }
}

const login = (token,userInfo, accesos,menu) => ({
    type: actionTypes.LOGIN,
    payload: {
        token,
        userInfo,
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