const {Router} = require('express');
const {pool} = require('../db');
const authRoutes = require('./auth.routes');
const userRoutes = require('./users.routes');


const router = Router();

router.get('/ping', async (req, res) => {
  const {rows} = await pool.query('SELECT NOW()');
  console.log(rows);
  res.json(rows[0]);
});

router.use(authRoutes);
router.use(userRoutes);

module.exports = router;
