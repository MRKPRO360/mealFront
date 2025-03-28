'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAppDispatch } from '@/redux/hooks';
import { addMeals } from '@/redux/features/cartSlice';
import { IRecipe } from '@/types';

interface PortionSize {
  price: string;
  servings: string;
}

interface Recipe {
  portionSizes: {
    small: PortionSize;
    medium: PortionSize;
    large: PortionSize;
  };
}

const RecipeSize = ({ recipe }: { recipe: IRecipe }) => {
  const [selectedSize, setSelectedSize] =
    useState<keyof Recipe['portionSizes']>('small');

  const dispatch = useAppDispatch();

  const handleAddToCart = (recipe: IRecipe) => {
    dispatch(addMeals(recipe));
  };

  return (
    <Card className=" w-full">
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Choose Portion Size:</h3>
        <div className="flex gap-2">
          {Object.entries(recipe.portionSizes).map(([size, details]) => (
            <CardContent
              key={size}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <p className="font-semibold capitalize">{size}</p>
                <p>Price: ${details.price}</p>
                <p>Servings: {details.servings}</p>
              </div>
            </CardContent>
          ))}
        </div>
      </div>

      <p className="mt-4">Price: ${recipe.portionSizes[selectedSize].price}</p>
      <p>Servings: {recipe.portionSizes[selectedSize].servings}</p>

      <Button className="mt-4 w-full" onClick={() => handleAddToCart(recipe)}>
        Add to Cart
      </Button>
    </Card>
  );
};

export default RecipeSize;
