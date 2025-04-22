'use server';

import { IReview } from '@/types';
import { cookies } from 'next/headers';

export const getAllRecipeReviews = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/reviews/recipes`
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllProviderReviews = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/reviews/providers`
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

// FOR CUSTOMER

export const getReviewElegibility = async (payload: Partial<IReview>) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/reviews/elegibility`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: (await cookies()).get('accessToken')!.value,
        },
        body: JSON.stringify(payload),
      }
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteMyReview = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/reviews/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: (await cookies()).get('accessToken')!.value,
        },
        // next: { tags: ['REVIEWS'] },
      }
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createMyReview = async (payload: Partial<IReview>) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: (await cookies()).get('accessToken')!.value,
      },
      body: JSON.stringify(payload),
      next: { tags: ['RECIPES'] },
    });
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateMyReview = async (id: string, payload: Partial<IReview>) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/reviews/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: (await cookies()).get('accessToken')!.value,
        },
        body: JSON.stringify(payload),
        // next: { tags: ['REVIEWS'] },
      }
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};
