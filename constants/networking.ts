import { Axios } from 'axios';

export const todoApiBaseUrl = 'http://127.0.0.1:3000/api';

export const loginEndpoint = '/auth';

export const signUpEndpoint = '/auth/signup';

export const taskResource = '/task';

export const HTTP_OK = 200;

export const axiosClient = new Axios({
    baseURL: todoApiBaseUrl,
    timeout: 3000,
});

axiosClient.interceptors.request.use(request => {
    console.log(`Request: ${JSON.stringify(request, null, 2)}`);
    return request;
});

axiosClient.interceptors.response.use(response => {
    console.log(`Response: ${JSON.stringify(response, null, 2)}`);
    return response;
});