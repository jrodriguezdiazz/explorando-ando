import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

function SearchBar() {
  return (

    <Container fluid>
      <Form
        className="d-flex" style={{
        margin: '0 auto',
        width: '50%'
      }}>
        <Form.Control
          type="search"
          placeholder="Caracteristicas"
          className="me-2"
          aria-label="Caracteristicas"
        />
        <Form.Control
          type="search"
          placeholder="Fecha"
          className="me-2"
          aria-label="Fecha"
        />
        <Button variant="outline-success">Buscar</Button>
      </Form>
    </Container>
  );
}

export default SearchBar;
