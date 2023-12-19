import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import UserBox from '../auth/UserBox';
import history from "../../utils/history"

function AppBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>Explorando Ando</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{maxHeight: '150px'}}
            navbarScroll
          >
            <Nav.Link href="/">HOME</Nav.Link>
            <Nav.Link href="explora">EXPLORA</Nav.Link>
            <Nav.Link href="resenas">RESEÑAS</Nav.Link>
            <Nav.Link href="sobre-nosotros">NOSOTROS</Nav.Link>
            <Nav.Link href="contacto">CONTACTO</Nav.Link>
          </Nav>
          <UserBox />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppBar;
