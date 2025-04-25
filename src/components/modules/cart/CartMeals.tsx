'use client';

import Image from 'next/image';
import emptyCart from '@/assets/images/cart/empty-cart.png';
import { useAppSelector } from '@/redux/hooks';
import { ICartMeals, selectCartMeals } from '@/redux/features/cartSlice';

import CartMealsCard from './CartMealsCard';

export default function CartMeals() {
  const meals = useAppSelector(selectCartMeals);

  return (
    <div className="bg-white rounded-sm col-span-12 lg:col-span-8 h-full row-span-3  space-y-5">
      {meals.length === 0 && (
        <div className="text-center text-gray-500 mt-4">
          <p className="text-lg font-semibold">Your cart is empty</p>
          <p className="mt-2">
            Your cart is emptier than a desert at high noon - time to quench its
            thirst with some delicious items!
          </p>
          <div className="flex justify-center items-center ">
            <Image src={emptyCart} alt="empty cart" />
          </div>
        </div>
      )}
      {meals?.map((meal: ICartMeals) => (
        <CartMealsCard key={meal._id} meal={meal} />
      ))}
    </div>
  );
}
