import * as yup from 'yup';

export const verifyOTPSchema = yup.object().shape({
  otpCode: yup
    .string()
    .trim()
    .length(6, 'OTP code must be exactly 6 characters.')
    .required('OTP code is required.'),
});
