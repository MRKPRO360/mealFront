import CreateMealPlanForm from '@/components/modules/dashboard/customer/create-meal-plan';
import { getMe } from '@/services/AuthService';
import { getAllRecipes } from '@/services/RecipeService';

async function CreateMyMealPlan() {
  const {
    data: { result },
  } = await getAllRecipes();

  const { data } = await getMe();

  return (
    <div>
      <CreateMealPlanForm user={data} recipes={result} />
    </div>
  );
}

export default CreateMyMealPlan;
