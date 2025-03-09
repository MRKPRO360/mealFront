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
      <Card className="shadow-md">
        {/* <CardHeader> */}
        <div
          className="relative min-w-full h-[300px] lg:h-[350px]
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
          <CardTitle className="mb-2">{recipe.recipeName}</CardTitle>
          <CardDescription>
            with{' '}
            {recipe?.ingredients
              ?.map((ingredient) => ingredient.name)
              .join(', ')}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}

export default RecipeCard;
