import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  identifier: yup.string().trim().required('Email or username is required.'),
  password: yup.string().required('Password is required.'),
});
