import api from './index';

export const getData = (url) => {
  return api.get(url);
};

export const getDataById = (url, id) => {
  return api.get(`${url}/${id}`);
};
