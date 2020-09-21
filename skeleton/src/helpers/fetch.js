// const BASE_URL = "http://127.0.0.1:3000/api/";
// const callApi = async (endpoint, data, method = 'GET') => {
//     const options = {};

//     if (method !== 'GET') {
      
//     }
//     options.headers = {
//         'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzdWFyaW9JZCI6MX0sImlhdCI6MTU5ODY0NTkwOH0.D3CbE9CdG_kjliv8F3jjSf4dnNy0BvpqPntYhbfHVXI`,
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//     };
//     options.body = JSON.stringify(data)
//     if (endpoint === "/auth") {
//         delete options.headers.Authorization;
//     }
//     const url = BASE_URL + endpoint;
//     console.log(url);
//     console.log("Options",options);
//     const response = await fetch(url, options);
//     const result = await response.json();

//     return result;
// }

// export default callApi;