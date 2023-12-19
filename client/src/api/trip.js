import api from './index';

export const addTrip = (data) => {
  return api.post('users', data);
};

export const editTrip = (data, id) => {
  return api.put(`users/${id}`, data);
};

export const deleteTrip = (id) => {
  return api.delete(`users/${id}`);
};

export const getTripById = (id) => {
  return api.get(`users/${id}`);
};

export const getAllTrips = () => {
  return api.get('users');
};

export const updatePassword = (data, id) => {
  return api.put(`/users/reset/${id}`, data);
};

export const getTripByCharacteristics = (data) => {
  return api.get(`/trip/find`, data);
}

export const getNextTrips = (data) => {
  return api.get(`/trip/next-trips`, data);
}
