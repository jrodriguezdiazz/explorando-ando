import {Form, Formik} from 'formik';
import React from 'react';
import {Card, Col, Container} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {addUser, editUser, getUserById} from '../../../api/user';
import CustomizedSnackbar from '../../../components/common/CustomizedSnackbar';
import {
  Button,
  Calendar,
  DropDown,
  EmailField,
  PasswordField,
  PhoneField,
  TextField,
} from '../../../components/common/form';
import useMode from '../../../hooks/useMode';
import {UserYupSchema} from '../../../schemas/user';

const sex = [
  {value: 1, label: 'M'},
  {value: 2, label: 'F'},
];
const RolList = [
  {value: '1', label: 'General'},
  {value: '2', label: 'Admin'},
  {value: '3', label: 'Super Admin'},
];
const UserMaintenance = () => {
  const history = useHistory();
  const {isEditMode, title, submitLabel, handleSubmit, initialData, error, id} = useMode({
    type: 'Usuario',
    onAdd: addUser,
    onEdit: editUser,
    redirectTo: '/dashboard/usuarios',
    fetchById: getUserById,
    removeValues: ['passwordConfirmation', 'isEditMode'],
    history
  });

  const newInitialData = initialData
    ? {
      ...initialData,
      isEditMode,
      ...(!isEditMode && {password: '', passwordConfirmation: ''}),
    }
    : null;

  return (
    <Container fluid>
      <h4>{title}</h4>
      {error && <CustomizedSnackbar variant="error" message={error} />}
      <Col>
        <Col>
          <Formik
            initialValues={
              newInitialData || {
                first_name: '',
                last_name: '',
                user_name: '',
                email: '',
                birthday: '',
                phone: '',
                isEditMode: isEditMode,
                sex_id: 1,
                roles_id: '1',
                oldPassword: '',
                password: '',
                confirmPassword: '',
                ...(!isEditMode && {password: '', passwordConfirmation: ''}),
              }
            }
            validationSchema={UserYupSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({isSubmitting}) => (
              <Form>
                <Card>
                  <Card.Title title={'Detalles'} />
                  <Container md={5}>
                    <Col xs={12} md={6}>
                      <TextField name={'user_name'} label={'Usuario'} />
                    </Col>
                    <Col xs={12} md={6}>
                      <EmailField name="email" label={'Email'} />
                    </Col>
                  </Container>
                  <Container md={5} spacing={3}>
                    <Col xs={12} md={6}>
                      <TextField name={'first_name'} label={'Nombre'} />
                    </Col>
                    <Col xs={12} md={6}>
                      <TextField name="last_name" label={'Apellido'} />
                    </Col>
                  </Container>
                  <Container md={5} spacing={3}>
                    <Col xs={12} md={6}>
                      <DropDown name={'sex_id'} items={sex} label={'Género'} />
                    </Col>
                    <Col xs={12} md={6}>
                      <DropDown name={'roles_id'} items={RolList} label={'Rol'} />
                    </Col>
                  </Container>
                  <Container md={5} spacing={3}>
                    <Col xs={12} md={6}>
                      <Calendar name="birthday" label="Fecha de nacimiento" />
                    </Col>
                    <Col xs={12} md={6}>
                      <PhoneField name="phone" label="Teléfono" />
                    </Col>
                  </Container>
                  {isEditMode ? null : (
                    <Container md={5} spacing={3}>
                      <Col xs={12} md={6}>
                        <PasswordField name="password" label={'Contraseña'} />
                      </Col>
                      <Col xs={12} md={6}>
                        <PasswordField name="passwordConfirmation" label={'Confirmar Contraseña'} />
                      </Col>
                    </Container>
                  )}
                  <Container md={5}>
                    <Col>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                      >
                        {submitLabel}
                      </Button>
                    </Col>
                  </Container>
                </Card>
              </Form>
            )}
          </Formik>
        </Col>
        {isEditMode && <PasswordUpdate id={id} />}
      </Col>
    </Container>
  );
};

const PasswordUpdate = ({id}) => {
  // Logic for password update

  return (
    <Col md={6}>
      {/* Password update form */}
    </Col>
  );
};

UserMaintenance.propTypes = {
  // PropTypes if needed
};

export default UserMaintenance;
