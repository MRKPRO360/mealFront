export interface IUser {
  id: string;
  _id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  role: 'customer' | 'provider' | 'admin';
  iat?: number;
  exp?: number;
  profileImg?: string;
  status?: 'in-progress' | 'blocked';
  phoneNumber?: string;
  address?: {
    street: string;
    city: string;
    district: string;
    zipCode: string;
  };
  dietaryPreferences?: string[];
  cuisineSpecialties?: string[];
  user?: IUser;
}
