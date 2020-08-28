// const BASE_URL = "http://104.155.131.229/api";
const BASE_URL = "http://127.0.0.1:3000/api";
const callApi = async (endpoint, options = {}) => {
    options.headers = {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzdWFyaW9JZCI6MX0sImlhdCI6MTU5ODY0NTkwOH0.D3CbE9CdG_kjliv8F3jjSf4dnNy0BvpqPntYhbfHVXI`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
    };
    if(endpoint==="/auth"){
        delete options.headers.Authorization;
    }
    const url = BASE_URL + endpoint;
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
}

export default callApi;