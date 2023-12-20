import * as Yup from 'yup';

export const UserYupSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(3, 'Inserte un mínimo de 3 caracteres')
    .max(20, 'Inserte un máximo de 20 caracteres')
    .required('Requerido'),
  last_name: Yup.string()
    .min(3, 'Inserte un mínimo de 3 caracteres')
    .max(30, 'Inserte un máximo de 30 caracteres')
    .required('Requerido'),
  user_name: Yup.string()
    .min(3, 'Inserte un mínimo de 3 caracteres')
    .max(15, 'Inserte un máximo de 15 caracteres')
    .required('Requerido'),
  birthday: Yup.date().required('Requerido'),
  email: Yup.string().email('Email invalido').required('Requerido'),
  isEditMode: Yup.boolean(),
  phone: Yup.string()
    .matches(
      /^((\+|)1)*( )*(?![0-9]{3}\))(\((?=[0-9]{3}\)))*[0-9]{3}\)*( |-)?[0-9]{3}( |-)?[0-9]{4}\b/,
      'Formato invalido'
    )
    .required('Requerido'),
  password: Yup.string().when('isEditMode', {
    is: false,
    then: Yup.string().min(6, 'Debe tener al menos 6 caracteres').required('Requerido'),
    otherwise: Yup.string(),
  }),
  passwordConfirmation: Yup.string().when('isEditMode', {
    is: false,
    then: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
      .required('Requerido'),
    otherwise: Yup.string(),
  }),
  sex_id: Yup.mixed().oneOf([1, 2]).required('Requerido'),
  roles_id: Yup.mixed().oneOf(['1', '2', '3']).required('Requerido'),
});
