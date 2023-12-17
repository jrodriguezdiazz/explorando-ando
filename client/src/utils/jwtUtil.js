import jwtDecode from 'jwt-decode';

import { getLocalStorage } from '@/utils/storageUtil';
import { JWT_TOKEN } from '@/config';

export let isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  } catch (e) {
    return false;
  }
};

export let getToken = () => {
  return getLocalStorage(JWT_TOKEN);
};

export let isAuthenticated = () => {
  return !!getToken() && !isTokenExpired(getToken());
};
