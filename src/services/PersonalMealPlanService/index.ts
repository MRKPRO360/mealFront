'use server';

import { cookies } from 'next/headers';
import { FieldValues } from 'react-hook-form';
import { revalidateTag } from 'next/cache';

export const getMyMealPlanForWeek = async (week: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/personal-meal-plans/week?week=${week}`,
      {
        method: 'GET',
        headers: {
          Authorization: (await cookies()).get('accessToken')!.value,
        },
        next: { tags: ['MYPLANS'] },
      }
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteMyMealPlanForWeek = async (week: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/personal-meal-plans/week?week=${week}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: (await cookies()).get('accessToken')!.value,
        },
        next: { tags: ['MYPLANS'] },
      }
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const removeMealFromWeek = async (weekId: string, mealId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/personal-meal-plans/${weekId}/meals/${mealId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: (await cookies()).get('accessToken')!.value,
        },
        next: { tags: ['MYPLANS'] },
      }
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateWeeklyPersonalPlan = async (
  id: string,
  data: FieldValues
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/personal-meal-plans/${id}/weekly-plan`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: (await cookies()).get('accessToken')!.value,
        },
        next: { tags: ['MYPLANS'] },
        body: JSON.stringify(data),
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
        next: { tags: ['MYPLANS'] },
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
        next: { tags: ['MYPLANS'] },
      }
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createMyPlans = async (data: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/personal-meal-plans`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: (await cookies()).get('accessToken')!.value,
        },
        next: { tags: ['MYPLANS'] },
        body: JSON.stringify(data),
      }
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export async function revalidateMealPlans() {
  revalidateTag('MYPLANS');
}
