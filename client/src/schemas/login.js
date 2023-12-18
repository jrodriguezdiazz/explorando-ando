import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email invalido').required('Requerido'),
  password: Yup.string().required('Por favor, ingresa tu contraseña'),
});

export default LoginSchema;
