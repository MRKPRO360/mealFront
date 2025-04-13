import { IReview } from './review';

export interface ICartAddress extends IAddress {
  name: string;
  email: string;
}

export interface IAddress {
  street: string;
  city: string;
  district: string;
  zipCode: string;
}
export interface IUser {
  id: string;
  _id: string;
  fullName: string;
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
  address?: IAddress;
  dietaryPreferences?: string[];
  cuisineSpecialties?: string[];
  bio: string;
  user?: IUser;
  rating?: string;
  ratingsCount: string;
  reviews: IReview[];
  createdAt: string;
  updatedAt: string;
}
