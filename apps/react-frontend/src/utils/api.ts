import axios from 'axios';

const instance = axios.create({
    baseURL: '/api',       // 和 Vite 代理路径一致
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,  // 如果后端需要 cookie
});

export default instance;