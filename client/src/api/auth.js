import api from './index';

export const login = (data) => {
  return api.post('auth/login', data);
};
