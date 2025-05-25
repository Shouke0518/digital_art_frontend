import { API_BASE_URL } from '../config';
import axios from 'axios';

const apiClient = axios.create({
    baseURL: `${API_BASE_URL}`,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
    responseType: 'json',
});

// 添加請求攔截器來處理 FormData
apiClient.interceptors.request.use(config => {
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
});

export default apiClient;