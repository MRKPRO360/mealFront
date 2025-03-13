/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { IRecipe } from '@/types';
import { Clock, ShoppingCart, Zap } from 'lucide-react';
import Link from 'next/link';

function PlanCard({ recipe }: { recipe: IRecipe }) {
  return (
    <Card key={recipe._id} className="shadow-md">
      <Link href={`/recipe/${recipe._id}`}>
        <CardHeader>
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
        </CardHeader>
      </Link>
      <CardContent className="pb-8">
        <CardTitle className="mb-2 font-semibold">
          {recipe.recipeName}
        </CardTitle>
        <CardDescription className="">
          <p className="text-gray-600">{recipe.description}</p>

          {/* Icons for Time & Difficulty */}
          <div className="text-sm text-gray-500 flex justify-between items-center mt-2">
            <div className="flex items-center gap-2 ">
              <Clock className="w-5 h-5 text-gray-500" /> {recipe.totalTime}
            </div>
            <div className="flex items-center gap-2 ">
              <Zap className="w-5 h-5 text-gray-500" /> {recipe.difficulty}
            </div>
            <button
              //   onClick={() => addToCart(meal._id)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5 text-green-600 " />
              Cart
            </button>
          </div>
        </CardDescription>
      </CardContent>{' '}
    </Card>
  );
}

export default PlanCard;
