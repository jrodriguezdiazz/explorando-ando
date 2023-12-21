const {Router} = require('express');
const {findNextTrip, getTripById, getAllTrips, getTripByCharacteristics} = require('../controllers/trip.controller');

const router = Router();

router.post('/trip/find', getTripByCharacteristics);

router.get('/trip', getAllTrips);

router.get('/trip/next-trips', findNextTrip);

router.get('/trip/:id', getTripById);


module.exports = router;
