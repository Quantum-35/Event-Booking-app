import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const apiClient = async(method, url, body) => {
    const instance = axios.create({
        baseURL: BASE_URL,
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const config = {
        method,
        url,
        response: 'json',
        data: body,
    };
    try {
        const response = await instance.request(config);
        return response;
    } catch (error) {
        return error;
    }
};

export default apiClient;