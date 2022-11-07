import axios from 'axios';
import config from '@/config/config';
import loginToken from '@//services/login-token';

const base = {
    createAxios(baseURL) {
        return getAxiosInstance(`${config.APIProxyPath}${baseURL}`);
    },
};

function getAxiosInstance(baseURL) {
    let instance = axios.create({
        baseURL: baseURL,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${loginToken.get()}`
        }
    });

    instance.interceptors.request.use(
        (response) => {
            return response;
        }, 
        (error) => { errorHandler(error) }
    );
    
    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => { errorHandler(error) }
    );

    return instance;
};

function errorHandler(error) {

    if(error.response.status == 500) {
        return;
    }
};

export default base;
