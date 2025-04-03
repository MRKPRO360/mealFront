import MyMeal from '@/components/modules/dashboard/provider';
import { getAllMyRecipes } from '@/services/RecipeService';

async function MyMealPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  const {
    data: { result, meta },
  } = await getAllMyRecipes(page, '10');

  return (
    <div>
      <MyMeal recipes={result} meta={meta} />
    </div>
  );
}

export default MyMealPage;
