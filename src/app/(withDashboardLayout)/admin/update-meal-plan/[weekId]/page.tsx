import UpdateMealPlanForm from '@/components/modules/dashboard/customer/update-meal-plan';
import { getMealPlanForWeek } from '@/services/MealPlanService';
import { getAllRecipesNameAndId } from '@/services/RecipeService';

async function UpdateMealPlanPage({
  params,
}: {
  params: Promise<{ weekId: string }>;
}) {
  const { weekId } = await params;

  const { data: weeklyPlan } = await getMealPlanForWeek(weekId);
  const { data } = await getAllRecipesNameAndId();

  return (
    <UpdateMealPlanForm
      isCustomer={false}
      recipes={data}
      weeklyPlan={weeklyPlan}
    />
  );
}

export default UpdateMealPlanPage;
