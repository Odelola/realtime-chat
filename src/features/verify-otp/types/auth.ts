export interface VerifyOTPBody {
  otpCode: string;
  email: string;
}

export interface VerifyOTPResponse {
  accessToken: string;
  expirationTime: number;
  refreshToken: string;
  refreshTokenExpiration: number;
  mfaRequired: boolean;
}
