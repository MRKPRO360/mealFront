import { IRecipe } from '@/types';
import RecipeDetailsBanner from './RecipeDetailsBanner';
import RecipeHeader from './RecipeHeader';

function RecipeDetails({ recipe }: { recipe: IRecipe }) {
  console.log(recipe);

  return (
    <div className="bg-amber-50/50">
      <RecipeDetailsBanner recipeImage={recipe.recipeImage} />
      <RecipeHeader />
    </div>
  );
}

export default RecipeDetails;
