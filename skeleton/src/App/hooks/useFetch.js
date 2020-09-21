import { useState, useEffect, useRef } from "react"
const BASE_URL = "http://127.0.0.1:3000/api/";
export const useFetch = (endpoint, data, method = 'GET') => {
const url=BASE_URL+endpoint;
    const options = {
        method,
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzdWFyaW9JZCI6MX0sImlhdCI6MTYwMDQ4MTg2Nn0.0sLs8P0_CZA_Qe4_xzMpQqVPeIabhR3PJiSsbgLBb0Y`,
            Accept: 'application/json',
        }
    };

    if (method !== 'GET') {
        options.body = JSON.stringify(data);
    }
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, []);

    const [state, setState] = useState({ data: null, loading: true, error: null });
    useEffect(() => {
        setState({ data: null, loading: true, error: null });
        fetch(url, options)
            .then(resp => resp.json())
            .then(data => {
                if (isMounted.current) {
                    setState({
                        loading: false,
                        error: false,
                        data
                    });
                } else {
                    console.log("El componente ya no esta montado");
                }
            });
    }, [url]);

    return state;
}