/**
 * axios setup to use mock service
 */

import axios from 'axios';
// import { ReactSession } from 'react-client-session';

const axiosServices = axios.create();

// interceptor for http
axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;
