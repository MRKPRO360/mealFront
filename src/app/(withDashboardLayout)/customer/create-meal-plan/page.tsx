import CreateMealPlanForm from '@/components/modules/dashboard/customer/create-meal-plan';

import { getAllRecipesNameAndId } from '@/services/RecipeService';

async function CreateMyMealPlan() {
  const { data } = await getAllRecipesNameAndId();

  return (
    <div>
      <CreateMealPlanForm recipes={data} />
    </div>
  );
}

export default CreateMyMealPlan;
