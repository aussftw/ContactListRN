import * as yup from 'yup';

const RegisterSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  first_name: yup.string().required('First Name is required'),
  last_name: yup.string().required('Last Name is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(2, 'Password must be at laeast 2 symbols')
    .max(32, 'Passwrord must contain no more than 32 symbols'),
  confirm_password: yup
    .string()
    .required('Password is required')
    .min(2, 'Password must be at laeast 2 symbols')
    .max(32, 'Passwrord must contain no more than 32 symbols')
    .oneOf([yup.ref('password'), null, 'Passwords should match']),
});

export default RegisterSchema;
