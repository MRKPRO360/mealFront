import { IRecipe } from '@/types';
import MyPlanCard from './MyPlanCard';
import { Frown } from 'lucide-react';

function AllRecipes({ recipes }: { recipes: IRecipe[] }) {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center text-muted-foreground grid place-content-center w-[90vw] md:w-[75vw] lg:w-[60vw] h-[50vh] ">
        <div className="flex items-center gap-2 text-gray-400 text-lg font-medium">
          <Frown className="w-8 h-8 " />
          No recipes found for the selected filters.
        </div>
        <p className="text-sm mt-1">
          Try adjusting your search or filter options.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-2 place-items-stretch">
      {recipes?.map((recipe: IRecipe) => (
        <MyPlanCard key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
}

export default AllRecipes;
