import * as yup from 'yup';

export const verifyOTPSchema = yup.object().shape({
  otp: yup
    .string()
    .trim()
    .length(6, 'OTP must be exactly 6 characters.')
    .required('OTP is required.'),
});
