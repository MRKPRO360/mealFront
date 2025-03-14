import { IRecipe } from '@/types';
import MyPlanCard from './MyPlanCard';

function AllRecipes({ recipes }: { recipes: IRecipe[] }) {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-between">
      {recipes?.map((recipe: IRecipe) => (
        <MyPlanCard key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
}

export default AllRecipes;
