'use server';

import { cookies } from 'next/headers';

export const getMyMealPlanForWeek = async (week: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/personal-meal-plans/week?week=${week}`,
      {
        method: 'GET',
        headers: {
          Authorization: (await cookies()).get('accessToken')!.value,
        },
      }
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getMyAllMealPlans = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/personal-meal-plans`,
      {
        method: 'GET',
        headers: {
          Authorization: (await cookies()).get('accessToken')!.value,
        },
      }
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getMyRecentPlans = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/personal-meal-plans/recent-plan`,
      {
        method: 'GET',
        headers: {
          Authorization: (await cookies()).get('accessToken')!.value,
        },
      }
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};
