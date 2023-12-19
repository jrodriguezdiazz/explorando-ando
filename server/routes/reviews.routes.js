const {Router} = require('express');
const {getLatestReviews, getReviewsForTrip} = require('../controllers/reviews.controller');

const router = Router();

router.get('/reviews/latest', getLatestReviews);

router.get('/reviews/:tripId', getReviewsForTrip);

module.exports = router;
