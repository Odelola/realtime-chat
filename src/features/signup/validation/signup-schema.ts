import * as yup from 'yup';

export const signupSchema = yup.object().shape({
  name: yup.string().trim().required('Name is required.').max(40),
  email: yup
    .string()
    .trim()
    .required('Email is required.')
    .email('Invalid email format.')
    .max(40),
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
