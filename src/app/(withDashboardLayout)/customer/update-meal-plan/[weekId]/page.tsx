// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ weekId: string }>;
// }) {
//   const { weekId } = await params;

import UpdateMealPlanForm from '@/components/modules/dashboard/customer/update-meal-plan';
import { getMyMealPlanForWeek } from '@/services/PersonalMealPlanService';
import { getAllRecipesNameAndId } from '@/services/RecipeService';

//   const { data } = await getSingleRecipe(weekId);
//   return {
//     title: data.recipeName,
//     description: data.description,
//   };
// }

async function UpdateMealPlanPage({
  params,
}: {
  params: Promise<{ weekId: string }>;
}) {
  const { weekId } = await params;

  const { data: weeklyPlan } = await getMyMealPlanForWeek(weekId);
  const { data } = await getAllRecipesNameAndId();

  return (
    <div>
      <UpdateMealPlanForm recipes={data} weeklyPlan={weeklyPlan} />
    </div>
  );
}

export default UpdateMealPlanPage;
