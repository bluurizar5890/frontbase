 const BASE_URL = "http://104.155.131.229/api";
//const BASE_URL = "http://127.0.0.1:3500/api";
const callApi = async (endpoint, options = {}) => {
    options.headers = {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzdWFyaW9JZCI6MX0sImlhdCI6MTU5NDUwOTAzOH0.0KivofSLCHDtqd_6-GauPlIhailkv1OcgleO3XkrooA`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
    };
    if(endpoint=="/auth"){
        delete options.headers.Authorization;
    }
    const url = BASE_URL + endpoint;
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
}

export default callApi;