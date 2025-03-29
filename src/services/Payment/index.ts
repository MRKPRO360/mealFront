'use server';

import { cookies } from 'next/headers';

export const createPaymentIntent = async (price: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/orders/create-payment-intent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price }),
      }
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createOrder = async (order: {
  grandTotal: number;
  paymentIntentId: string;
  email: string;
  mealsId: string;
  paymentMethod: string;
  meals: {
    meal: string;
    selectedSize: 'small' | 'medium' | 'large';
    quantity: number;
  }[];
  shippingAddress: string;
}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders`, {
      method: 'POST',
      headers: {
        Authorization: (await cookies()).get('accessToken')!.value,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};
