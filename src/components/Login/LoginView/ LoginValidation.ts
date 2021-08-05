import * as yup from 'yup';

const LoginSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(2, 'Password must be at laeast 2 symbols')
    .max(24, 'Passwrord must contain no more than 24 symbols'),
});

export default LoginSchema;
