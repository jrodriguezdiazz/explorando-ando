import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Footer from '../common/FooterPrivate';
import Header from '../common/Header';
import MiniDrawer from '../common/MiniDrawer';

const MainLayout = ({children}) => {
  return (
    <Container fluid style={{width: '100%', height: 'auto', overflow: 'hidden'}}>
      <div style={{position: 'relative', display: 'flex', width: '100%', height: '100%'}}>
        <Header />
        <MiniDrawer />
        <main style={{width: '100%', flexGrow: 1, padding: 24, height: 'calc(100% - 56px)', marginTop: 56}}>
          {children}
        </main>
      </div>
      <Footer />
    </Container>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element,
};

export default MainLayout;
