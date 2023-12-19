const Joi = require('@hapi/joi');

const validate = {
  storeUser: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    birthday: Joi.date().required(),
    sex_id: Joi.number().required(),
    phone: Joi.string().required(),
    user_name: Joi.string().required(),
    roles_id: Joi.string().required(),
  }),

  updateUser: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),

  login: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = validate;
