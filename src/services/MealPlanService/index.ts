'use server';

export const getMealPlanForWeek = async (week: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/meal-plans/week?week=${week}`
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllMealPlans = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/meal-plans`);
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

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
