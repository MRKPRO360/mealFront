import { Card, CardContent } from '@/components/ui/card';
import { IIngredient, INutritionValues } from '@/types';
import { FaCheck } from 'react-icons/fa6';
import { MdNotInterested } from 'react-icons/md';

function RecipeIngredients({
  ingredients,
  nutrition,
}: {
  ingredients: IIngredient[];
  nutrition: INutritionValues;
}) {
  const includedIngredients = ingredients.filter(
    (item) => item.quantity !== 'Not included in delivery'
  );

  const notIncludedIngredients = ingredients.filter(
    (item) => item.quantity === 'Not included in delivery'
  );

  return (
    <div className="max-w-6xl rounded-xs mx-auto mt-12 lg:mt-0 ">
      <div className="md:flex gap-5 justify-between">
        <div className="basis-[65%] rounded-xs bg-white">
          {/* Ingredients */}
          <Card className=" rounded-xs p-6 pb-0">
            <CardContent className="sm:px-0 border-b pb-4">
              <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
              <ul className="space-y-2">
                {includedIngredients.map((item, index) => (
                  <div className="mb-3 flex gap-2 items-center" key={index}>
                    <FaCheck className="text-green-700" />
                    <li className="  space-x-2">
                      <span>
                        {item.quantity} {item.name}
                      </span>
                      {item.contains && item.contains.length > 0 && (
                        <span className="text-red-700">
                          (Contains {item.contains.join(', ')})
                        </span>
                      )}
                    </li>
                  </div>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Not Included */}
          <Card className="border-b md:border-b-0 p-6">
            <CardContent className="sm:px-0">
              <h2 className="text-xl font-semibold mb-4">
                Not included in your delivery
              </h2>
              <ul className="space-y-2">
                {notIncludedIngredients.map((item, index) => (
                  <div className="mb-3 flex gap-2 items-center" key={index}>
                    <MdNotInterested className=" text-red-700" />

                    <li key={index} className="flex justify-between gap-2">
                      <span>{item.name}</span>
                      {item.contains && item.contains.length > 0 && (
                        <span className="text-red-700">
                          (Contains {item.contains})
                        </span>
                      )}
                    </li>
                  </div>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Nutrition Values */}
        <Card className="flex-1 p-6 bg-white">
          <CardContent className="">
            <h2 className="text-xl font-semibold mb-4">Nutrition Values</h2>
            <ul className="space-y-2">
              {Object.entries(nutrition)
                .filter(([key]) => key !== '_id')
                .map(([key, value], index) => (
                  <div className="mb-3 flex gap-2 items-center" key={index}>
                    <FaCheck className="text-green-700" />
                    <li className="flex items-center justify-between w-full">
                      <span className="capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span className="font-semibold">{value}</span>
                    </li>
                  </div>
                ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default RecipeIngredients;
