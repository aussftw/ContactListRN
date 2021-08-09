import * as yup from 'yup';

const CreateContactSchema = yup.object().shape({
  first_name: yup
    .string()
    .required('First Name is required')
    .min(2, 'Your first name must contain at least 2 letters')
    .max(25, 'Your first name must contain no more than 25 letters'),
  last_name: yup
    .string()
    .required('Last Name is required')
    .min(2, 'Your last name must contain at least 2 letters')
    .max(25, 'Your last name must contain no more than 25 letters'),
  phone_number: yup
    .number()
    .required('Phone number is required')
    .test(
      'len',
      'Your phone number must contain at least 6 numbers, but no more than 10 numbers',
      val => val && val.toString().length >= 6 && val.toString().length <= 10,
    ),
});

export default CreateContactSchema;
