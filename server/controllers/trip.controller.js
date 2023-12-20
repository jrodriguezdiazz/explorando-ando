const {pool} = require('../db');
const HttpStatus = require('http-status-codes');

async function findTrip(req, res) {
  const {characteristics, date} = req.body;
  try {
    // const {rows} = await pool.query(`CALL find_trip()`);
    res.json({
      error: false,
      data: [
        {
          id: 'bayahibe',
          title: 'Bayahibe',
          location: 'https://maps.app.goo.gl/cjzUDEoPEWpEpL8s8',
          banner: 'https://www.mitur.gob.do/wp-content/uploads/2022/03/Playa-Dominicus-Bayahibe.jpg',
          province: 'La Romana',
          description: `Bayahíbe es una pequeña localidad costera ubicada en la provincia de La Romana, República Dominicana. Es un destino turístico popular conocido por sus hermosas playas, aguas cristalinas y una gran variedad de actividades para disfrutar.\nAdemás de sus hermosas playas, Bayahíbe ofrece una gran variedad de actividades para disfrutar. Los visitantes pueden explorar la naturaleza, practicar deportes acuáticos, visitar lugares históricos o simplemente relajarse y disfrutar del sol.\nBayahíbe es un destino turístico ideal para familias, parejas y grupos de amigos. Es un lugar donde los visitantes pueden disfrutar de la belleza natural, las actividades al aire libre y la rica cultura de República Dominicana.`,
          tripsComforts: [
            'Free wifi',
            'Air Conditioning',
            'Parking available'
          ],
          nearbyPlaces: [
            {
              name: 'Hotel Penselvenyia',
              distance: '2 km'
            },
            {
              name: 'Travis Bakery store house',
              distance: '3 km'
            },
            {
              name: 'Hotel Penselvenyia',
              distance: '1 km'
            }
          ],
          accommodations: [
            {
              id: '',
              name: 'Estándar twin ben, Camas múltiples',
              image: 'https://www.thespruce.com/thmb/ercyUzkNihNJGN9yIfD_y___t_g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cozy-bedroom-ideas-5078657-hero-2763eb67d1f0404e9ab8eb7280553e8e.jpg',
              feature: [
                '300 pies cuadrados',
                'Duerme 3',
                '1 cama doble y 1 cama individual'
              ]
            },
          ],
          reservationDate: {
            start: '2020-01-01',
            end: '2020-01-01',
          }
        },
        {
          id: 'bayahibe2',
          title: 'Bayahibe',
          location: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15047.745278022!2d-70.6842885!3d19.4583122!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb1c588ebfa7e65%3A0xf4f05177e484049e!2sBella%20Terra%20Mall!5e0!3m2!1sen!2sdo!4v1702859435251!5m2!1sen!2sdo',
          banner: 'https://www.mitur.gob.do/wp-content/uploads/2022/03/Playa-Dominicus-Bayahibe.jpg',
          province: 'La Romana',
          description: `Bayahíbe es una pequeña localidad costera ubicada en la provincia de La Romana, República Dominicana. Es un destino turístico popular conocido por sus hermosas playas, aguas cristalinas y una gran variedad de actividades para disfrutar.\nAdemás de sus hermosas playas, Bayahíbe ofrece una gran variedad de actividades para disfrutar. Los visitantes pueden explorar la naturaleza, practicar deportes acuáticos, visitar lugares históricos o simplemente relajarse y disfrutar del sol.\nBayahíbe es un destino turístico ideal para familias, parejas y grupos de amigos. Es un lugar donde los visitantes pueden disfrutar de la belleza natural, las actividades al aire libre y la rica cultura de República Dominicana.`,
          tripsComforts: [
            'Free wifi',
            'Air Conditioning',
            'Parking available'
          ],
          nearbyPlaces: [
            {
              name: 'Hotel Penselvenyia',
              distance: '2 km'
            },
            {
              name: 'Travis Bakery store house',
              distance: '3 km'
            },
            {
              name: 'Hotel Penselvenyia',
              distance: '1 km'
            }
          ],
          accommodations: [
            {
              id: '',
              name: 'Estándar twin ben, Camas múltiples',
              image: 'https://www.thespruce.com/thmb/ercyUzkNihNJGN9yIfD_y___t_g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cozy-bedroom-ideas-5078657-hero-2763eb67d1f0404e9ab8eb7280553e8e.jpg',
              feature: [
                '300 pies cuadrados',
                'Duerme 3',
                '1 cama doble y 1 cama individual'
              ]
            },
          ],
          reservationDate: {
            start: '2020-01-01',
            end: '2020-01-01',
          }
        },
      ]
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
}

async function findTripById(req, res) {
  const {characteristics, date} = req.body;
  try {
    // const {rows} = await pool.query(`CALL find_trip()`);
    res.json({
      error: false,
      data: [
        {
          id: 'bayahibe',
          title: 'Bayahibe',
          location: 'https://maps.app.goo.gl/cjzUDEoPEWpEpL8s8',
          banner: 'https://www.mitur.gob.do/wp-content/uploads/2022/03/Playa-Dominicus-Bayahibe.jpg',
          province: 'La Romana',
          description: `Bayahíbe es una pequeña localidad costera ubicada en la provincia de La Romana, República Dominicana. Es un destino turístico popular conocido por sus hermosas playas, aguas cristalinas y una gran variedad de actividades para disfrutar.\nAdemás de sus hermosas playas, Bayahíbe ofrece una gran variedad de actividades para disfrutar. Los visitantes pueden explorar la naturaleza, practicar deportes acuáticos, visitar lugares históricos o simplemente relajarse y disfrutar del sol.\nBayahíbe es un destino turístico ideal para familias, parejas y grupos de amigos. Es un lugar donde los visitantes pueden disfrutar de la belleza natural, las actividades al aire libre y la rica cultura de República Dominicana.`,
          tripsComforts: [
            'Free wifi',
            'Air Conditioning',
            'Parking available'
          ],
          nearbyPlaces: [
            {
              name: 'Hotel Penselvenyia',
              distance: '2 km'
            },
            {
              name: 'Travis Bakery store house',
              distance: '3 km'
            },
            {
              name: 'Hotel Penselvenyia',
              distance: '1 km'
            }
          ],
          accommodations: [
            {
              id: '',
              name: 'Estándar twin ben, Camas múltiples',
              image: 'https://www.thespruce.com/thmb/ercyUzkNihNJGN9yIfD_y___t_g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cozy-bedroom-ideas-5078657-hero-2763eb67d1f0404e9ab8eb7280553e8e.jpg',
              feature: [
                '300 pies cuadrados',
                'Duerme 3',
                '1 cama doble y 1 cama individual'
              ]
            },
          ],
          reservationDate: {
            start: '2020-01-01',
            end: '2020-01-01',
          }
        },
        {
          id: 'bayahibe2',
          title: 'Bayahibe',
          location: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15047.745278022!2d-70.6842885!3d19.4583122!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb1c588ebfa7e65%3A0xf4f05177e484049e!2sBella%20Terra%20Mall!5e0!3m2!1sen!2sdo!4v1702859435251!5m2!1sen!2sdo',
          banner: 'https://www.mitur.gob.do/wp-content/uploads/2022/03/Playa-Dominicus-Bayahibe.jpg',
          province: 'La Romana',
          description: `Bayahíbe es una pequeña localidad costera ubicada en la provincia de La Romana, República Dominicana. Es un destino turístico popular conocido por sus hermosas playas, aguas cristalinas y una gran variedad de actividades para disfrutar.\nAdemás de sus hermosas playas, Bayahíbe ofrece una gran variedad de actividades para disfrutar. Los visitantes pueden explorar la naturaleza, practicar deportes acuáticos, visitar lugares históricos o simplemente relajarse y disfrutar del sol.\nBayahíbe es un destino turístico ideal para familias, parejas y grupos de amigos. Es un lugar donde los visitantes pueden disfrutar de la belleza natural, las actividades al aire libre y la rica cultura de República Dominicana.`,
          tripsComforts: [
            'Free wifi',
            'Air Conditioning',
            'Parking available'
          ],
          nearbyPlaces: [
            {
              name: 'Hotel Penselvenyia',
              distance: '2 km'
            },
            {
              name: 'Travis Bakery store house',
              distance: '3 km'
            },
            {
              name: 'Hotel Penselvenyia',
              distance: '1 km'
            }
          ],
          accommodations: [
            {
              id: '',
              name: 'Estándar twin ben, Camas múltiples',
              image: 'https://www.thespruce.com/thmb/ercyUzkNihNJGN9yIfD_y___t_g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cozy-bedroom-ideas-5078657-hero-2763eb67d1f0404e9ab8eb7280553e8e.jpg',
              feature: [
                '300 pies cuadrados',
                'Duerme 3',
                '1 cama doble y 1 cama individual'
              ]
            },
          ],
          reservationDate: {
            start: '2020-01-01',
            end: '2020-01-01',
          }
        },
      ]
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
}

async function findNextTrip(req, res) {
  const {characteristics, date} = req.body;
  try {
    // const {rows} = await pool.query(`CALL find_trip()`);
    res.json({
      error: false,
      data: [
        {
          id: 'bayahibe',
          title: 'Bayahibe',
          location: 'https://maps.app.goo.gl/cjzUDEoPEWpEpL8s8',
          banner: 'https://www.mitur.gob.do/wp-content/uploads/2022/03/Playa-Dominicus-Bayahibe.jpg',
          province: 'La Romana',
          description: `Bayahíbe es una pequeña localidad costera ubicada en la provincia de La Romana, República Dominicana. Es un destino turístico popular conocido por sus hermosas playas, aguas cristalinas y una gran variedad de actividades para disfrutar.\nAdemás de sus hermosas playas, Bayahíbe ofrece una gran variedad de actividades para disfrutar. Los visitantes pueden explorar la naturaleza, practicar deportes acuáticos, visitar lugares históricos o simplemente relajarse y disfrutar del sol.\nBayahíbe es un destino turístico ideal para familias, parejas y grupos de amigos. Es un lugar donde los visitantes pueden disfrutar de la belleza natural, las actividades al aire libre y la rica cultura de República Dominicana.`,
          tripsComforts: [
            'Free wifi',
            'Air Conditioning',
            'Parking available'
          ],
          nearbyPlaces: [
            {
              name: 'Hotel Penselvenyia',
              distance: '2 km'
            },
            {
              name: 'Travis Bakery store house',
              distance: '3 km'
            },
            {
              name: 'Hotel Penselvenyia',
              distance: '1 km'
            }
          ],
          accommodations: [
            {
              id: '',
              name: 'Estándar twin ben, Camas múltiples',
              image: 'https://www.thespruce.com/thmb/ercyUzkNihNJGN9yIfD_y___t_g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cozy-bedroom-ideas-5078657-hero-2763eb67d1f0404e9ab8eb7280553e8e.jpg',
              feature: [
                '300 pies cuadrados',
                'Duerme 3',
                '1 cama doble y 1 cama individual'
              ]
            },
          ],
          reservationDate: {
            start: '2020-01-01',
            end: '2020-01-01',
          }
        },
      ]
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
}

module.exports = {
  findTrip,
  findNextTrip,
  findTripById
};
