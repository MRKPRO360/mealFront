/* eslint-disable @next/next/no-img-element */
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TruncatedText } from '@/components/ui/core/FTTruncateText';
import { addMeals } from '@/redux/features/cartSlice';
import { useAppDispatch } from '@/redux/hooks';
import { IRecipe } from '@/types';
import { Clock, ShoppingCart, Zap } from 'lucide-react';
import Link from 'next/link';

function MyPlanCard({ recipe }: { recipe: IRecipe }) {
  const dispatch = useAppDispatch();

  const handleAddMeals = (meal: IRecipe) => {
    dispatch(addMeals(meal));
  };

  return (
    <Card
      key={recipe._id}
      className="shadow-sm hover:shadow-md hover:scale-[1.01] transition duration-300 will-change-transform ease-out"
    >
      <Link href={`/recipe/${recipe._id}`}>
        <CardHeader>
          <div
            className="relative min-w-full h-[200px] lg:h-[250px]
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
        <CardTitle className="font-semibold">{recipe.recipeName}</CardTitle>
        <CardDescription>
          <TruncatedText
            text={recipe.description}
            maxLength={40}
            className="text-gray-600 my-3"
          />

          {/* Icons for Time & Difficulty */}
          <div className="text-sm text-gray-500 flex justify-between items-center mt-2">
            <div className="flex items-center gap-2 ">
              <Clock className="w-5 h-5 text-gray-500" /> {recipe.totalTime}
            </div>
            <div className="flex items-center gap-2 ">
              <Zap className="w-5 h-5 text-gray-500" /> {recipe.difficulty}
            </div>
            <button
              onClick={() => handleAddMeals(recipe)}
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

export default MyPlanCard;
