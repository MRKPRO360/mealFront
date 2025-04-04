import { IRecipe } from './recipe.interface';
import { IUser } from './user';

export interface IOrderMeal {
  meal: IRecipe;
  quantity: number;
  selectedSize: 'small' | 'medium' | 'large';
  status: 'Pending' | 'Completed' | 'Cancelled';
}

export interface IOrder {
  _id: string;
  user: IUser;
  meals: IOrderMeal[];
  deliveryCharge: number;
  totalAmount: number;
  finalAmount: number;
  createdAt: string;
  updatedAt: string;
  shippingAddress: string;
  paymentMethod: 'Cash' | 'Card' | 'Online';
  orderStatus: 'Pending' | 'Completed' | 'Cancelled';
  paymentIntentId?: string;
}
