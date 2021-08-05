import * as yup from 'yup';

const CreateContactSchema = yup.object().shape({
  first_name: yup.string().required('First Name is required'),
  last_name: yup.string().required('Last Name is required'),
  phone_number: yup.string().required('Phone nuumber is required'),
});

export default CreateContactSchema;
