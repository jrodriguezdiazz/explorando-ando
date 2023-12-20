import {useHistory} from 'react-router-dom';
import CustomizedSnackbar from '../../../components/common/CustomizedSnackbar';
import {Form, Formik} from 'formik';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {Col, Container} from 'react-bootstrap';
import {addTrip, editTrip, getTripById} from '../../../api/trip';

import {
  Button,
  Calendar,
  ImageDropZone,
  LinkField,
  NumberField,
  TextAreaField,
  TextField,
} from '../../../components/common/form';
import useMode from '../../../hooks/useMode';


const TripMaintenance = () => {
  const history = useHistory();
  const {title, submitLabel, handleSubmit, initialData, error} = useMode({
    type: 'Destino',
    onAdd: addTrip,
    onEdit: editTrip,
    fetchById: getTripById,
    redirectTo: '/dashboard/destinos',
    history
  });

  useEffect(() => {

  }, []);

  const urlImage = initialData ? initialData.url_image : '';

  return (
    <Container>
      <h4>
        {title}
      </h4>
      {error && <CustomizedSnackbar variant="error" message={error} />}
      <Formik
        initialValues={
          initialData || {
            url_image: '',
            url_trailer: '',
            name: '',
            description: '',
            release_date: '',
            duration: '',
            countries_id: '',
            restriction_id: '',
            director: '',
            languages_id: '',
            genres_id: '',
            cast: '',
          }
        }
        // validate={validateMovie}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({isSubmitting}) => (
          <Form>
            <Container container spacing={3}>
              <Container item xs={12} md={4}>
                {/*<ImageDropZone name="url_image" urlImage={urlImage || "https://www.mitur.gob.do/wp-content/uploads/2022/03/Playa-Dominicus-Bayahibe.jpg"} />*/}
                <LinkField label={'Trailer Link'} name={'url_trailer'} />
                <Button name={'save'} type={'submit'} disabled={isSubmitting}>
                  {submitLabel}
                </Button>
              </Container>
              <Container item xs={12} md={8}>
                <TextField label={'Título'} name={'name'} />
                <TextAreaField label={'Sinapsis'} name={'description'} />
                <br />
                <Container container spacing={3}>
                  <Col item xs={12} md={3}>
                    <Calendar label={'Año'} name={'release_date'} />
                  </Col>
                  <Col item xs={12} md={3}>
                    <NumberField label={'Duración (min)'} name={'duration'} />
                  </Col>
                </Container>
                <Container container spacing={3}>
                  <Col item xs={12} md={6}>
                    <TextField label={'Director'} name={'director'} />
                  </Col>
                </Container>
              </Container>
            </Container>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

const validateMovie = (values) => {
  const errors = {};
  const requiredFields = [
    'url_trailer',
    'name',
    'description',
    'release_date',
    'duration',
    'countries_id',
    'restriction_id',
    'director',
    'languages_id',
    'genres_id',
    'cast',
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = '(The ' + field + ' field is required.)';
    }
  });

  return errors;
};

TripMaintenance.propTypes = {
  handleSubmit: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default TripMaintenance;
