export interface User {
  email: string;
  userId: string;
  fullName: string;
  address: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expired_in: string;
}
