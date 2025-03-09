import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

function RecipeHeader() {
  return (
    <div className="transform  -translate-y-14">
      <div className="max-w-6xl rounded-xs mx-auto p-6 bg-white">
        <div className="flex justify-between border-b-1">
          {/* Recipe Title */}
          <div className="mb-4">
            <h1 className="text-4xl font-bold tracking-wider leading-12">
              Crispy Kickin’ Cayenne Chicken Cutlets
            </h1>
            <h2 className="text-3xl text-gray-600 mt-2">
              with Mashed Potatoes, Carrots & a Honey Drizzle
            </h2>
          </div>
          <Button className="underline py-6 text-base">
            Get Free Ready Made Meals For Life + 50% Off
          </Button>
        </div>
        {/* Description */}
        <div className="flex justify-between mt-5">
          <p className=" text-gray-700 basis-[65%]">
            Our chefs take the beloved sporting event staple, Buffalo wings,
            from messy app to epic weeknight dinner this week. Chicken is coated
            in a cheesy, Frank’s Red Hot–spiced panko mixture, roasted to juicy,
            crunchy perfection, drizzled with creamy Buffalo-style sauce, and a
            bit of honey. Oh, and did we mention there are buttery roasted
            carrots and scallion mashed potatoes on the side?! Yeah, it’s safe
            to say this dish is a slam dunk/home run/touchdown!
          </p>
          {/* Time & Difficulty */}
          <Card className="flex-1">
            <CardContent className="text-center space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-bold">Total Time</p>
                <p>30 minutes</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-bold">Prep Time</p>
                <p>5 minutes</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-bold">Difficulty</p>
                <p>Easy</p>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Tags */}
        <div className="mt-4 flex gap-2 items-center">
          <p className=" text-gray-700 font-semibold">Tags:</p>
          <Badge variant="outline">Fiber Smart</Badge>
          <Badge variant="outline">Easy Prep</Badge>
          <Badge variant="outline">Spicy</Badge>
        </div>

        {/* Allergens */}
        <p className="mt-4 text-gray-700 font-semibold">
          Allergens: <span className="font-normal">Milk • Wheat</span>
        </p>

        <p className="text-sm text-gray-500">
          Produced in a facility that processes eggs, milk, fish, peanuts,
          sesame, shellfish, soy, tree nuts, and wheat.
        </p>
      </div>
    </div>
  );
}

export default RecipeHeader;
