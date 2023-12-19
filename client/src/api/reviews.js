import api from './index';

export const addReviews = (data) => {
  return api.post('users', data);
};

export const editReviews = (data, id) => {
  return api.put(`users/${id}`, data);
};

export const deleteReviews = (id) => {
  return api.delete(`users/${id}`);
};

export const getReviewsById = (id) => {
  return api.get(`users/${id}`);
};

export const getAllReviewss = () => {
  return api.get('users');
};

export const updatePassword = (data, id) => {
  return api.put(`/users/reset/${id}`, data);
};
