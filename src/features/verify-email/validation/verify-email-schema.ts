import * as yup from 'yup';

export const verifyEmailSchema = yup.object().shape({
  token: yup
    .string()
    .trim()
    .length(6, 'Token must be exactly 6 characters.')
    .required('Token is required.'),
});
