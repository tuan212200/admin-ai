import axios from 'axios';
import { message } from 'antd';
import { AUTH_DOMAIN, ECODE } from '@/constant';

const codeMessage = {
  502: 'The system is updating. Please wait a moment.',
  403: 'No access rights. Please contact the IT Team for support.',
  401: 'Unauthorized. Please log in again.',
  404: 'The requested resource does not exist.',
  500: 'Server error. Please try again later.',
};

// Create an axios instance
const service = axios.create({
  baseURL: 'https://sb-admin.kido.vn/', // URL prefix
  timeout: 10000, // Request timeout
  withCredentials: true, // Send cookies when cross-domain requests
  headers: {
    'Content-Type': 'application/json', 
    'Access-Control-Allow-Origin': '*', // Allow requests from any origin
  },
});

// Request interceptor
service.interceptors.request.use(
  (config) => {
    // Add authorization header if token exists
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Prevent redirect by setting the origin to match the current hostname
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    
    // If the custom code is not 0, it is judged as an error.
    if (res.code !== 0 && res.code !== 200) {
      message.error(res.message || 'Error');
      
      // Session invalid (token expired or invalid)
      if (res.code === ECODE.SESSION_INVALID) {
        // Use the current hostname instead of redirecting to localhost
        const currentHost = window.location.hostname;
        const authDomain = AUTH_DOMAIN[currentHost] || AUTH_DOMAIN['localhost'];
        
        window.location.href =
          'https://' +
          authDomain +
          '/login/?refType=ADMIN_AI&redirect_url=' +
          encodeURI(window.location.href);
        return Promise.reject(new Error(res.message || 'Session invalid'));
      }
      
      // Permission denied
      if (res.code === ECODE.PERMISSION_DENIED) {
        if (window.location.pathname !== '/403') {
          window.location.href = '/403?redirect_url=' + encodeURI(window.location.href);
        }
        return Promise.reject(new Error(res.message || 'Permission denied'));
      }
      
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  (error) => {
    const { response } = error;
    
    if (!response) {
      message.error({
        content: 'Network error. Please check your connection.',
        key: 'Network_Error',
        duration: 10,
      });
    } else if (response && response.status) {
      if (response.status === 401) {
        // Use the current hostname instead of redirecting to localhost
        const currentHost = window.location.hostname;
        const authDomain = AUTH_DOMAIN[currentHost] || AUTH_DOMAIN['localhost'];
        
        window.location.href =
          'https://' +
          authDomain +
          '/login/?refType=ADMIN_AI&redirect_url=' +
          encodeURI(window.location.href);
        return;
      }
      
      const errorText = codeMessage[response.status] || response.statusText;
      message.error({
        content: errorText,
        key: 'Server_Error',
        duration: 10,
      });
    }
    
    return Promise.reject(error);
  }
);

export default service;