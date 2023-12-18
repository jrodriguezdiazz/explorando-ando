import { API_URL, JWT_TOKEN } from '../config';
import { getLocalStorage } from '../utils/storageUtil';
import axios from 'axios';

const api = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-XSRF-TOKEN': getLocalStorage(JWT_TOKEN),
  },
  responseType: 'json',
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (401 === error.response.status) {
      // redirect to login page
    }
    if (404 === error.response.status) {
      // redirect to 404 page
    }
    if (500 === error.response.status) {
      // redirect to 500 page
    }

    return Promise.reject(error);
  }
);

export const headerMultiPart = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

export default api;
