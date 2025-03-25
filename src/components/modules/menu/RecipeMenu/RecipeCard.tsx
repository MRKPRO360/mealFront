/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { IRecipe } from '@/types';
import Link from 'next/link';

function RecipeCard({ recipe }: { recipe: IRecipe }) {
  return (
    <Link href={`/recipe/${recipe._id}`}>
      <Card className="shadow-sm hover:shadow-md hover:scale-[1.01] transition duration-300 will-change-transform ease-out">
        {/* <CardHeader> */}
        <div
          className="relative min-w-full h-[300px] 
"
        >
          <img
            className="w-full h-full absolute object-cover rounded-t-xs"
            src={recipe.recipeImage}
            alt="recipe menu image"
          />
        </div>
        {/* </CardHeader> */}
        <CardContent className="pb-8">
          <CardTitle className="mb-2 min-h-8">{recipe.recipeName}</CardTitle>
          <CardDescription className="">
            with{' '}
            {(() => {
              const ingredientText = recipe?.ingredients
                ?.map((ingredient) => ingredient.name)
                .join(', ');

              return ingredientText.length > 70
                ? ingredientText.slice(0, 67) + ' etc.'
                : ingredientText + '.';
            })()}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}

export default RecipeCard;
