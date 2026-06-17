export interface LoginBody {
  identifier: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  email: string;
}
