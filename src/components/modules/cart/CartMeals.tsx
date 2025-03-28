'use client';

import Image from 'next/image';
import emptyCart from '@/assets/images/cart/empty-cart.png';
import { useAppSelector } from '@/redux/hooks';
import { selectCartMeals } from '@/redux/features/cartSlice';
import { IRecipe } from '@/types';
import CartMealsCard from './CartMealsCard';
// import {
//   CartProduct,
//   orderedProductsSelector,
// } from '@/redux/features/cartSlice';
export default function CartMeals() {
  const meals = useAppSelector(selectCartMeals);

  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-8 h-full row-span-3 p-10 space-y-5">
      {meals.length === 0 && (
        <div className="text-center text-gray-500">
          <p className="text-lg font-semibold">Your cart is empty</p>
          <p className="mt-2">
            Looks like your cart is on vacation—bring it back to work by adding
            some items!
          </p>
          <div className="flex justify-center items-center ">
            <Image src={emptyCart} alt="empty cart" />
          </div>
        </div>
      )}
      {meals?.map((meal: IRecipe) => (
        <CartMealsCard key={meal._id} meal={meal} />
      ))}
    </div>
  );
}
