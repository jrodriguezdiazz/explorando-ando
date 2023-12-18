import React, {Fragment} from 'react';
import {Badge} from 'react-bootstrap';

export default function TripDescription() {
  return (
    <Fragment>
      <h2>Bayahibe</h2>
      <Badge bg="warning" text="light">4.5/5 (84 Reseñas)</Badge>
      <p>Provincia de La Romana, República Dominicana</p>
      <p>Descripción del destino...</p>
      <p>
        Bayahíbe es una pequeña localidad costera ubicada en la provincia de La Romana, República Dominicana. Es un destino turístico popular conocido por sus hermosas playas, aguas cristalinas y una gran variedad de actividades para disfrutar.
        <br />
        Además de sus hermosas playas, Bayahíbe ofrece una gran variedad de actividades para disfrutar. Los visitantes pueden explorar la naturaleza, practicar deportes acuáticos, visitar lugares históricos o simplemente relajarse y disfrutar del sol.
        <br />
        Bayahíbe es un destino turístico ideal para familias, parejas y grupos de amigos. Es un lugar donde los visitantes pueden disfrutar de la belleza natural, las actividades al aire libre y la rica cultura de República Dominicana.
      </p>
    </Fragment>
  );
}
