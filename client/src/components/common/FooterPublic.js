import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Facebook, Instagram} from '../common/Icons';

const socialMedia = [
  {
    Icon: Facebook, link: 'https://www.facebook.com/caribbeancinemasrd/'
  },
  {
    Icon: Instagram, link: 'https://www.instagram.com/'
  },
];

const SocialMediaLinks = () => (
  <Col xs={6} sm={3}>
    <h6>Síguenos</h6>
    <div>
      {socialMedia.map(({Icon, link}) => (
        <Link to={{pathname: link}} key={link} target="_blank" rel="noopener noreferrer" className="social-icon">
          <Icon />
        </Link>
      ))}
    </div>
  </Col>
);

const footers = [
  {
    title: 'Páginas',
    links: [
      {title: 'INICIO', link: '/'},
      {title: 'EXPLORA', link: 'explora'},
      {title: 'RESEÑAS', link: 'resenas'},
      {title: 'NOSOTROS', link: 'sobre-nosotros'},
      {title: 'CONTACTO', link: 'contacto'},
    ],
  },
];

const FooterPublic = () => (
  <div
    style={{
      backgroundColor: '#295943',
    }}>
    <Row className="justify-content-center text-white"
    style={{
      paddingTop: 20
    }}
    >
      <Col xs={12} sm={3}>
        <p>Explorando Ando</p>
        <p>Emprenda un Viaje Inolvidable por la República Dominicana: Descubra su Exuberante Naturaleza, Cultura Vibrante y Playas Paradisíacas, Todo Mientras Disfruta de Momentos Llenos de Felicidad y Sonrisas Memorables</p>
      </Col>
      {footers.map(({title, links}) => (
        <Col xs={6} sm={3} key={title}>
          <h6>{title}</h6>
          <ul className="list-unstyled">
            {links.map(({title, link}) => (
              <li key={title}>
                <Link className={'text-white'} to={link}>{title}</Link>
              </li>
            ))}
          </ul>
        </Col>
      ))}
      <Col xs={12} sm={3} className="text-left">
        <p>Contacto</p>
        <p>
          Address: Bella Terra Mall No. 205 A
          Kediri, Pare AG17
          Phone: 123 456 7890
          Email: explorandoando@gmail.com
          Maps: Explorando Ando, Bella Terra Mall</p>
      </Col>
    </Row>
    {/*<SocialMediaLinks />*/}
  </div>
);

export default FooterPublic;
