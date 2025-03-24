import UpdateMeal from '@/components/modules/dashboard/provider/update-meal';
import { getSingleRecipe } from '@/services/RecipeService';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ mealId: string }>;
}) {
  const { mealId } = await params;

  const { data } = await getSingleRecipe(mealId);
  return {
    title: data.recipeName,
    description: data.description,
  };
}

async function UpdateMealPage({
  params,
}: {
  params: Promise<{ mealId: string }>;
}) {
  const { mealId } = await params;

  const { data } = await getSingleRecipe(mealId);

  return (
    <div>
      <UpdateMeal recipe={data} />
    </div>
  );
}

export default UpdateMealPage;
