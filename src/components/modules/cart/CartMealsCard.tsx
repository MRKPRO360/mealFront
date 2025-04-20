// import { Button } from '@/components/ui/button';
// import {
//   CartMeals,
//   decrementOrderQuantity,
//   incrementOrderQuantity,
//   removeMeals,
// } from '@/redux/features/cartSlice';
// // import { currencyFormatter } from '@/lib/currencyFormatter';

// import { useAppDispatch } from '@/redux/hooks';
// import { IRecipe } from '@/types';

// import { Minus, Plus, Trash } from 'lucide-react';
// import Image from 'next/image';
// import { useState } from 'react';

// export default function CartMealsCard({ meal }: { meal: CartMeals }) {

//     const [selectedSize, setSelectedSize] =
//       useState<keyof IRecipe['portionSizes']>('small');

//   const dispatch = useAppDispatch();

//   const handleIncrementQuantity = (id: string) => {
//     dispatch(incrementOrderQuantity(id));
//   };

//   const handleDecrementQuantity = (id: string) => {
//     dispatch(decrementOrderQuantity(id));
//   };

//   const handleRemoveMeal = (id: string) => {
//     dispatch(removeMeals(id));
//   };

//   const cloudinaryLoader = ({ src }: { src: string }) => {
//     return src; // Use the direct Cloudinary URL
//   };

//   return (
//     <div className="bg-white rounded-lg flex p-5 gap-5">
//       <div className="h-full w-32 rounded-md overflow-hidden">
//         <Image
//           loader={cloudinaryLoader}
//           src={meal?.recipeImage}
//           height={200}
//           width={200}
//           alt="recipe image"
//           className="aspect-square object-cover"
//         />
//       </div>
//       <div className="flex flex-col justify-between flex-grow">
//         <h1 className="text-xl font-semibold">{meal?.name}</h1>
//         <div className="flex gap-5 my-2">
//           <p>
//             <span className="text-gray-500">Stock Availability:</span>{' '}
//             {/* <span className="font-semibold">{product?.stock}</span> */}
//           </p>
//         </div>
//         <hr className="my-1" />
//         <div className="flex items-center justify-between">
//           <h2>
//             Price: 30
//             {/* {product.offerPrice
//               ? currencyFormatter(product.offerPrice)
//               : currencyFormatter(product.price)} */}
//           </h2>
//           <div className="flex items-center gap-2">
//             <p className="text-gray-500 font-semibold">Quantity</p>
//             <Button
//               onClick={() => handleDecrementQuantity(meal._id)}
//               variant="outline"
//               className="size-8 rounded-sm"
//             >
//               <Minus />
//             </Button>
//             <p className="font-semibold text-xl p-2">{meal?.orderQuantity}</p>
//             <Button
//               onClick={() => handleIncrementQuantity(meal._id)}
//               variant="outline"
//               className="size-8 rounded-sm"
//             >
//               <Plus />
//             </Button>
//             <Button
//               onClick={() => handleRemoveMeal(meal._id)}
//               variant="outline"
//               className="size-8 rounded-sm"
//             >
//               <Trash className="text-red-500/50" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Button } from '@/components/ui/button';
import {
  decrementOrderQuantity,
  ICartMeals,
  incrementOrderQuantity,
  removeMeals,
  updatePortionSize,
} from '@/redux/features/cartSlice';
import { useAppDispatch } from '@/redux/hooks';
import { IRecipe } from '@/types';

import { Minus, Plus, Trash } from 'lucide-react';
import Image from 'next/image';

const isCustomized = (customization?: {
  ingredients?: string[];
  spiceLevel?: string;
  dietaryPreference?: string[];
}): boolean => {
  return !!(
    customization &&
    (customization.ingredients?.length ||
      customization.spiceLevel ||
      customization.dietaryPreference?.length)
  );
};

export default function CartMealsCard({ meal }: { meal: ICartMeals }) {
  const dispatch = useAppDispatch();

  const handleIncrementQuantity = () => {
    // if (meal.orderQuantity < maxQuantity) {
    dispatch(incrementOrderQuantity(meal._id));
    // }
  };

  const handleDecrementQuantity = () => {
    if (meal.orderQuantity > 1) {
      dispatch(decrementOrderQuantity(meal._id));
    } else {
      dispatch(removeMeals(meal._id)); // Remove meal if quantity goes to 0
    }
  };

  const handleSelectPortionSize = (size: keyof IRecipe['portionSizes']) => {
    // Reset quantity to 1 when changing portion size
    dispatch(updatePortionSize({ id: meal._id, size }));
  };

  const handleRemoveMeal = (id: string) => {
    dispatch(removeMeals(id));
  };

  const cloudinaryLoader = ({ src }: { src: string }) => {
    return src; // Use the direct Cloudinary URL
  };

  return (
    <div className="bg-white rounded-lg items-start flex-col flex sm:flex-row sm:items-center p-5 gap-5">
      <div className="h-full w-40 sm:w-32 rounded-sm overflow-hidden">
        <Image
          loader={cloudinaryLoader}
          src={meal?.recipeImage}
          height={200}
          width={200}
          alt="recipe image"
          className="aspect-square object-cover"
        />
      </div>
      <div className="flex flex-col justify-between w-full">
        <h1 className="text-xl font-semibold">{meal?.name}</h1>

        {/* Portion Size Selection */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2 mt-2">
            {Object.keys(meal.portionSizes).map((size) => (
              <Button
                key={size}
                variant={meal.selectedSize === size ? 'default' : 'outline'}
                size="sm"
                onClick={() =>
                  handleSelectPortionSize(size as keyof IRecipe['portionSizes'])
                }
              >
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </Button>
            ))}
          </div>
          {isCustomized(meal.customization) && (
            <span className="text-xs text-green-600 bg-green-100 rounded-full px-2 py-0.5">
              Customized
            </span>
          )}
        </div>

        <hr className="my-1" />

        {/* Display Dynamic Price Based on Selected Portion */}
        <div className="flex items-center justify-between flex-wrap sm:flex-nowrap gap-2">
          <h2 className="flex-[25%]">
            Price: ${meal.portionSizes[meal.selectedSize]?.price}
          </h2>
          <h2 className="flex-[25%]">
            Servings: {meal.portionSizes[meal.selectedSize]?.servings}
          </h2>

          <div className="flex-1 flex items-center  gap-2 w-full">
            <p className="text-gray-500 font-semibold mr-auto  sm:mr-0 sm:ml-auto">
              Quantity
            </p>
            <Button
              onClick={handleDecrementQuantity}
              variant="outline"
              size="sm"
              className="size-8 rounded-sm"
            >
              <Minus />
            </Button>
            <p className="font-semibold text-xl p-2">{meal?.orderQuantity}</p>
            <Button
              onClick={handleIncrementQuantity}
              variant="outline"
              size="sm"
              className="size-8 rounded-sm"
            >
              <Plus />
            </Button>
            <Button
              onClick={() => handleRemoveMeal(meal._id)}
              variant="outline"
              size="sm"
              className="size-8 rounded-sm"
            >
              <Trash className="text-red-500/50" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
