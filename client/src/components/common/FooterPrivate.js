import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

const FooterPrivate = ({ style }) => {
  return (
    <Container fluid style={{ ...style, position: 'static', bottom: 0, width: '100%', padding: '15px' }}>
      <div className="copyright">
        © Caribbean Cinema, 2022. Creado por LICEM 🔥
      </div>
    </Container>
  );
};

FooterPrivate.propTypes = {
  style: PropTypes.object,
};

export default FooterPrivate;
