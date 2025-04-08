import { IRecipe } from '@/types';
import RecipeDetailsBanner from './RecipeDetailsBanner';
import RecipeHeader from './RecipeHeader';
import RecipeIngredients from './RecipeIngredients';
import RecipeUtensils from './RecipeUtensils';
import RecipeInstruction from './RecipeInstruction';
import Review from './Review';
import ReviewList from './ReviewList';

function RecipeDetails({ recipe }: { recipe: IRecipe }) {
  return (
    <div className="bg-gray-100/80">
      <RecipeDetailsBanner recipeImage={recipe.recipeImage} />

      <RecipeHeader recipe={recipe} />

      <RecipeIngredients
        ingredients={recipe.ingredients}
        nutrition={recipe.nutritionValues}
      />
      <RecipeUtensils utensils={recipe.utensils} />
      <RecipeInstruction instructions={recipe.instructions} />
      <ReviewList reviews={recipe.reviews} />
      <Review reviews={recipe.reviews} />
    </div>
  );
}

export default RecipeDetails;
