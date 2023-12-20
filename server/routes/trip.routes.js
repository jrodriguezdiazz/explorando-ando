const {Router} = require('express');
const {findTrip} = require('../controllers/trip.controller');
const {findNextTrip} = require('../controllers/trip.controller');

const router = Router();

router.get('/trip/find', findTrip);

router.get('/trip', findTrip);

router.get('/trip/next-trips', findNextTrip);

module.exports = router;
