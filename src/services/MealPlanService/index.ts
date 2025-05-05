'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { FieldValues } from 'react-hook-form';

export const getMealPlanForWeek = async (week: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/meal-plans/week?week=${week}`,
      {
        next: { tags: ['PLANS'] },
      }
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteMealPlanForWeek = async (week: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/meal-plans/week?week=${week}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: (await cookies()).get('accessToken')!.value,
        },
        next: { tags: ['PLANS'] },
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
      `${process.env.NEXT_PUBLIC_BASE_API}/meal-plans/${weekId}/meals/${mealId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: (await cookies()).get('accessToken')!.value,
        },
        next: { tags: ['PLANS'] },
      }
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateWeeklyPlan = async (id: string, data: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/meal-plans/${id}/weekly-plan`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: (await cookies()).get('accessToken')!.value,
        },
        next: { tags: ['PLANS'] },
        body: JSON.stringify(data),
      }
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllMealPlans = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/meal-plans`, {
      next: { tags: ['PLANS'] },
    });
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

// CURRENT PREVIOUS MONTH PLANS
export const getRecentPlans = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/meal-plans/recent-plan`
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createPlans = async (data: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/meal-plans`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: (await cookies()).get('accessToken')!.value,
      },
      next: { tags: ['PLANS'] },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export async function revalidateMealPlans() {
  revalidateTag('PLANS');
}
