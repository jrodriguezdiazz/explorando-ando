import api from './index';

export const addTrip = (data) => {
  return api.post('trip', data);
};

export const editTrip = (data, id) => {
  return api.put(`trip/${id}`, data);
};

export const deleteTrip = (id) => {
  return api.delete(`/trip/${id}`);
};

export const getTripById = (id) => {
  return api.get(`/trip/${id}`);
};

export const getAllTrips = () => {
  return api.get('/trip');
};

export const updatePassword = (data, id) => {
  return api.put(`/trip/reset/${id}`, data);
};

export const getTripByCharacteristics = (data) => {
  return api.post(`/trip/find`, data);
}

export const getNextTrips = () => {
  return api.get(`/trip/next-trips`);
}
