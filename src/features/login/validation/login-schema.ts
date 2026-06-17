import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  identifier: yup
    .string()
    .trim()
    .required('Email or username is required.'),
  password: yup
    .string()
    .required('Password is required.')
    .min(8, 'Password must be at least 8 characters long.')
    .max(64, 'Password must not exceed 64 characters.')
    .matches(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter.',
    })
    .matches(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter.',
    })
    .matches(/\d/, {
      message: 'Password must contain at least one number.',
    })
    .matches(/[^A-Za-z0-9]/, {
      message: 'Password must contain at least one special character.',
    }),
});
