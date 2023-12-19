const {Router} = require('express');
const {pool} = require('../db');
const authRoutes = require('./auth.routes');
const userRoutes = require('./users.routes');
const tripRoutes = require('./trip.routes');
const reviewsRoutes = require('./reviews.routes');

const router = Router();

router.get('/ping', async (req, res) => {
  const {rows} = await pool.query('SELECT NOW()');
  console.log(rows);
  res.json(rows[0]);
});

router.use(authRoutes);
router.use(userRoutes);
router.use(tripRoutes);
router.use(reviewsRoutes);

module.exports = router;
