export interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'provider' | 'admin';
  iat?: number;
  exp?: number;
  profileImg?: string;
}
