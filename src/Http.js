import axios from 'axios';

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;

const config = {
    baseURL: `http://${host}:${port}/${process.env.REACT_APP_API}`,
    auth: {
        username: process.env.REACT_APP_AUTH_LOGIN,
        password: process.env.REACT_APP_AUTH_PASS
    }
};

const http = axios.create(config);

export default http;
