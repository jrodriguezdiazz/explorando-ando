const {Router} = require('express');
const validate = require('../config/joi.validate');
const schema = require('../utils/validator');
const {
  findAll,
  findById,
  store,
  update,
  deleteUser,
  resetPassword,
} = require('../controllers/users.controller');

const router = Router();

router.get('/users', findAll);

router.get('/users/:id', findById);

router.post('/users', store);

router.put('/users/:id', update);

router.put('/users/reset/:id', resetPassword);

router.delete('/users/:id', deleteUser);

module.exports = router;
