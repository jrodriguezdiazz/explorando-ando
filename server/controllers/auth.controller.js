const bcrypt = require('bcrypt');
const HttpStatus = require('http-status-codes');
const jwt = require('jsonwebtoken');
const {pool} = require('../db');

/**
 * Returns jwt token if valid email and password is provided
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
const login = async (req, res) => {
  const {email, password} = req.body;
  const {rows} = await pool.query(`SELECT * FROM users WHERE email = '${email}'`);
  if (rows.length !== 0) {
    const [user] = rows;
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.TOKEN_SECRET_KEY
      );

      res.json({
        success: true,
        token,
        email: user.email,
        user: {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          birthday: user.birthday,
          phone: user.phone,
          stripeId: user.stripe_id,
          sexId: user.sex_id,
          userName: user.user_name,
        },
      });
    } else {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Authentication failed. Invalid password.',
      });
    }
  } else {
    res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      message: 'Invalid username or password.',
    });
  }
};

module.exports = {login};
