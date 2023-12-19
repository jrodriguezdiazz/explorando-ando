const HttpStatus = require('http-status-codes');

async function getLatestReviews(req, res) {
  try {
    // const {rows} = await pool.query(`CALL find_trip()`);
    res.json({
      error: false,
      data: [
        {
          id: '1234',
          userId: 'Maria',
          name: 'Olga',
          starts: 4,
          review: 'El ministerio hizo un buen trabajo en la remoción de los puentes colgantes, señalizaciones y demás. En el salto en si, no permiten bañarse, pero del otro lado hay 3 pozas de corriente suave y sin piedras gigantes, ideal para ir con niños.',
          image: 'https://traphilcom.files.wordpress.com/2020/06/salto-jimenoa-ii-in-jarabacoa-dominican-republic00019.jpeg',
          tripId: '234567',
          tripName: 'Salto Jimenoa 2',
          header: 'Me gustó mucho'
        },
        {
          id: '1234',
          userId: 'Maria',
          name: 'Olga',
          starts: 4,
          review: 'El ministerio hizo un buen trabajo en la remoción de los puentes colgantes, señalizaciones y demás. En el salto en si, no permiten bañarse, pero del otro lado hay 3 pozas de corriente suave y sin piedras gigantes, ideal para ir con niños.',
          image: 'https://traphilcom.files.wordpress.com/2020/06/salto-jimenoa-ii-in-jarabacoa-dominican-republic00019.jpeg',
          tripId: '234567',
          tripName: 'Salto Jimenoa 2',
          header: 'Me gustó mucho'
        }
      ]
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
}

async function getReviewsForTrip(req, res) {
  try {
    // const {rows} = await pool.query(`CALL find_trip()`);
    res.json({
      error: false,
      data: [
        {
          id: '1234',
          userId: 'Maria',
          name: 'Olga',
          starts: 4,
          review: 'El ministerio hizo un buen trabajo en la remoción de los puentes colgantes, señalizaciones y demás. En el salto en si, no permiten bañarse, pero del otro lado hay 3 pozas de corriente suave y sin piedras gigantes, ideal para ir con niños.',
          image: 'https://traphilcom.files.wordpress.com/2020/06/salto-jimenoa-ii-in-jarabacoa-dominican-republic00019.jpeg',
          tripId: '234567',
          tripName: 'Salto Jimenoa 2',
          header: 'Me gustó mucho'
        },
        {
          id: '1234',
          userId: 'Maria',
          name: 'Olga',
          starts: 4,
          review: 'El ministerio hizo un buen trabajo en la remoción de los puentes colgantes, señalizaciones y demás. En el salto en si, no permiten bañarse, pero del otro lado hay 3 pozas de corriente suave y sin piedras gigantes, ideal para ir con niños.',
          image: 'https://traphilcom.files.wordpress.com/2020/06/salto-jimenoa-ii-in-jarabacoa-dominican-republic00019.jpeg',
          tripId: '234567',
          tripName: 'Salto Jimenoa 2',
          header: 'Me gustó mucho'
        }
      ]
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
}


module.exports = {
  getLatestReviews,
  getReviewsForTrip
}
