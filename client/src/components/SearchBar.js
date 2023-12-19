import {useFormik} from 'formik';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import useTripStore from '../stores/tripStore';
import history from '../utils/history';

function SearchBar() {
  const {fetchTripsBySearchBar} = useTripStore((state) => state);

  const formik = useFormik({
    initialValues: {
      characteristics: '', date: ''
    },
    onSubmit: async (values) => {
      await fetchTripsBySearchBar(values);
      history.push("/explora");
    }
  });

  return (
    <Container fluid>
      <Form
        className="d-flex"
        style={{margin: '0 auto', width: '50%'}}
        onSubmit={formik.handleSubmit}
      >
        <Form.Control
          type="search"
          name="characteristics"
          placeholder="Caracteristicas"
          className="me-2"
          aria-label="Caracteristicas"
          onChange={formik.handleChange}
          value={formik.values.characteristics}
          required
        />
        <Form.Control
          type="search"
          name="date"
          placeholder="Fecha"
          className="me-2"
          aria-label="Fecha"
          onChange={formik.handleChange}
          value={formik.values.date}
        />
        <Button variant="outline-success" type="submit">Buscar</Button>
      </Form>
    </Container>
  );
}

export default SearchBar;
