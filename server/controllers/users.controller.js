/* eslint-disable camelcase */
const bcrypt = require('bcrypt');
const {v4: uuidv4} = require('uuid');
const HttpStatus = require('http-status-codes');
const {regExPassword} = require('../utils/regExPassword');
const {pool} = require('../db');


async function findAll(req, res) {
  try {
    const {rows} = await pool.query(`SELECT *
                                     FROM users
                                     WHERE status_id = '1'
                                     ORDER BY created_at ASC`);
    res.json({
      error: false,
      data: rows,
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
}


async function findById(req, res) {
  try {
    const {rows} = await pool.query('SELECT * FROM users WHERE id = $1', [req.params.id]);

    if (rows.length === 0) {
      res.status(HttpStatus.NOT_FOUND).json({
        error: true,
        data: {},
      });
    } else {
      res.json({
        error: false,
        data: rows[0],
      });
    }
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
}

const store = async (req, res) => {
  try {
    const {first_name, last_name, email, birthday, phone, sex_id, roles_id, user_name} = req.body;
    const id = uuidv4();
    const password = bcrypt.hashSync(req.body.password, 10);
    const {rows} = await pool.query(
      `SELECT COUNT(*) AS total
       from users
       where email = '${email}'`
    );
    const isUserRegistered = parseInt(rows[0].total) > 0;

    if (isUserRegistered) {
      res.status(HttpStatus.BAD_REQUEST).json({
        details: [{message: 'Invalid email.'}],
      });
    } else {
      const insert = `INSERT INTO users (id, first_name, last_name, birthday, email, phone, password, sex_id,
                                         roles_id, status_id)
                      VALUES ('${id}', '${first_name}', '${last_name}', '${birthday}', '${email}',
                              '${phone}', '${password}', '${sex_id}', '${roles_id}', '1');`;
      const {row} = await pool.query(insert);
      res.json({
        success: true,
        data: row,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
  }
};

function update(req, res) {
  const {first_name, last_name, email, birthday, phone, sex_id, roles_id, user_name} = req.body;
  const userId = req.params.id;

  const query = `
      UPDATE users
      SET first_name = $1,
          last_name  = $2,
          email      = $3,
          birthday   = $4,
          phone      = $5,
          sex_id     = $6,
          roles_id   = $7,
          user_name  = $8
      WHERE id = $9
  `;

  const values = [first_name, last_name, email, birthday, phone, sex_id, roles_id, user_name, userId];

  pool
    .query(query, values)
    .then((result) =>
      res.json({
        error: false,
        data: result,
      })
    )
    .catch((err) =>
      res.status(500).json({
        error: true,
        data: {message: err.message},
      })
    );
}


function deleteUser(req, res) {
  pool
    .query(`UPDATE users
            SET status_id = '0'
            WHERE id = '${req.params.id}';`)
    .then(() =>
      res.json({
        error: false,
        data: {message: 'User deleted successfully.'},
      })
    )
    .catch((err) =>
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: true,
        data: {message: err.message},
      })
    );
}

const resetPassword = async (req, res) => {
  if (!regExPassword.test(req.body.password)) {
    res.send({
      message:
        'La contraseña debe contener mínimo seis caracteres y máximo dieciséis caracteres, al menos una letra y un número',
    });
  }

  const {oldPassword} = req.body;
  const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [req.body.id]);

  if (users.length !== 0) {
    const [user] = users;
    if (bcrypt.compareSync(oldPassword, user.password)) {
      try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const resetPassword = await pool
          .query('UPDATE users SET ? where id = ?', [
            {
              password: req.body.password,
            },
            req.body.id,
          ])
          .then(() => {
            res.status(HttpStatus.CREATED).send({
              message: 'Password change success',
            });
          })
          .catch((error) => {
            console.error('Something goes wrong:', error);
            res.status(HttpStatus.CREATED).send({
              message: 'Something goes wrong',
              error,
            });
          });
        console.log('password', resetPassword);
      } catch (error) {
        console.error('Something goes wrong at the final:', error);
        res.status(HttpStatus.CREATED).send({
          message: 'Something goes wrong',
          error,
        });
      }
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

module.exports = {
  resetPassword,
  deleteUser,
  update,
  store,
  findById,
  findAll
};
