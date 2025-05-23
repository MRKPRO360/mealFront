'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { addMeals } from '@/redux/features/cartSlice';
import { useAppDispatch } from '@/redux/hooks';
import { IRecipe, IUser } from '@/types';
import { ShoppingCart } from 'lucide-react';
import ProviderInfo from './ProviderInfo';
import { useUser } from '@/context/UserContext';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

function RecipeHeader({ recipe }: { recipe: IRecipe }) {
  const dispatch = useAppDispatch();
  const { user } = useUser();

  const handleAddToCart = (recipe: IRecipe) => {
    dispatch(addMeals(recipe));
  };

  return (
    <div className="transform lg:-translate-y-16">
      <div className="max-w-6xl rounded-xs mx-auto p-6 bg-white">
        <div className="lg:flex justify-between border-b-1 pb-3 lg:pb-0">
          {/* Recipe Title */}
          <div className="mb-4">
            <h1 className="text-4xl font-bold tracking-wider leading-12">
              {recipe.recipeName}
            </h1>
            <h2 className="text-3xl  mt-2">{recipe.description}</h2>
          </div>
          <Button className="underline py-6 text-base">
            Get Free Ready Made Meals For Life + 50% Off
          </Button>
        </div>
        {/* Description */}
        <div className="space-y-5 md:space-y-0 md:flex justify-between gap-5 mt-5">
          <div className="basis-[65%]">
            <p>
              Our chefs take the beloved sporting event staple, Buffalo wings,
              from messy app to epic weeknight dinner this week. Chicken is
              coated in a cheesy, Frank’s Red Hot–spiced panko mixture, roasted
              to juicy, crunchy perfection, drizzled with creamy Buffalo-style
              sauce, and a bit of honey. Oh, and did we mention there are
              buttery roasted carrots and scallion mashed potatoes on the side?!
              Yeah, it’s safe to say this dish is a slam dunk/home
              run/touchdown!
            </p>
            {/* Tags */}
            <div className="mt-4 flex gap-2 items-center">
              <p className="font-semibold">Tags:</p>
              {recipe.tags.map((tag) => (
                <Badge variant="outline" key={tag}>
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Allergens */}
            <p className="mt-4  font-semibold">
              Allergens:{' '}
              <span className="font-normal">
                {recipe.allergens.join(' • ')}
              </span>
            </p>

            <p className="text-md my-2">
              Produced in a facility that processes eggs, milk, fish, peanuts,
              sesame, shellfish, soy, tree nuts, and wheat.
            </p>
            {/* Rating */}
            <div className="flex items-center gap-2">
              <span className="font-semibold">Rating:</span>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-xl">
                    {Number(recipe.rating) >= star ? (
                      <FaStar className="text-yellow-400" />
                    ) : Number(recipe.rating) >= star - 0.5 ? (
                      <FaStarHalfAlt className="text-yellow-400" />
                    ) : (
                      <FaRegStar className="text-yellow-400" />
                    )}
                  </span>
                ))}
              </div>
              <span>{Number(recipe.rating).toFixed(1)}</span>
            </div>
          </div>

          <div>
            {/* Time & Difficulty */}
            <Card className="flex-1">
              <CardContent className="text-center space-y-4 sm:px-0">
                <div className="flex items-center justify-between">
                  <p className="font-bold">Total Time</p>
                  <p>{recipe.totalTime}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-bold">Prep Time</p>
                  <p>{recipe.prepTime}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-bold">Difficulty</p>
                  <p>{recipe.difficulty}</p>
                </div>
              </CardContent>
            </Card>

            {/* Provider Info */}
            <ProviderInfo provider={recipe?.providerId as unknown as IUser} />
          </div>
        </div>

        {/* Add to cart */}
        {user?.role !== 'provider' && (
          <Button
            className="mt-2"
            onClick={() => handleAddToCart(recipe)}
            size="sm"
          >
            <ShoppingCart />
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
}

export default RecipeHeader;
