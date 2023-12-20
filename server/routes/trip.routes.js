const {Router} = require('express');
const {findTrip, findTripById, findNextTrip} = require('../controllers/trip.controller');

const router = Router();

router.get('/trip/find', findTrip);

router.get('/trip', findTripById);

router.get('/trip/:id', findTrip);

router.get('/trip/next-trips', findNextTrip);

module.exports = router;
