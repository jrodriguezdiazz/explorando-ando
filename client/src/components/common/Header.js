import PropTypes from 'prop-types';
import {Button, Container, Nav, Navbar} from 'react-bootstrap';
import useAuthStore from '../../stores/authStore';

const Header = () => {
  const logout = useAuthStore((state) => state.logout);

  const handleLogOut = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <Navbar expand="lg" variant="light" bg="light" fixed="top">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Button onClick={handleLogOut}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

Header.propTypes = {
  navDrawerOpen: PropTypes.bool,
  handleToggleDrawer: PropTypes.func,
};

export default Header;
