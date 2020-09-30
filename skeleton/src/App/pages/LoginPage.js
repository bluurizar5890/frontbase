import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginBackend } from '../../actions/auth';
import * as actionTypes from '../../store/actions'
const LoginPage = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state)
    console.log(state);
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginBackend("blopez","username"));
        console.log("Login button");
    }
    return (
        <div>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default LoginPage
