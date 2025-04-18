/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { FTContentModal } from '@/components/ui/core/FTContentModal';
import { TruncatedText } from '@/components/ui/core/FTTruncateText';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';

import { addMeals, IMealCustomization } from '@/redux/features/cartSlice';
import { useAppDispatch } from '@/redux/hooks';
import { IRecipe } from '@/types';
import { Clock, Info, Settings, ShoppingCart, Smile, Zap } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface ICustomization {
  ingredients: string[];
  spiceLevel: number;
  dietaryPreference: string[];
}

function MyPlanCard({
  recipe,
  tags,
  preferences,
}: {
  recipe: IRecipe;
  tags?: string[];
  preferences?: string[];
}) {
  const [customization, setCustomization] = useState<IMealCustomization | null>(
    null
  );

  const spiceMap: Record<number, string> = {
    0: 'Mild',
    1: 'Medium',
    2: 'Hot',
    3: 'Very Hot',
  };

  const dispatch = useAppDispatch();

  const optionalIngredients = ['Olives', 'Mushrooms', 'Cheese', 'Onions'];

  const handleAddMeals = (meal: IRecipe) => {
    const customizedMeal = {
      ...meal,
      customization,
    };

    dispatch(addMeals(customizedMeal));
    toast.success('Recipe added to the cart :)');
  };

  const form = useForm<ICustomization>({
    defaultValues: {
      ingredients: [],
      spiceLevel: 1,
      dietaryPreference: preferences || tags,
    },
  });

  useEffect(() => {
    if (preferences?.length) {
      form.setValue('dietaryPreference', preferences);
    }
  }, [preferences, form]);

  return (
    <Card
      key={recipe._id}
      className="shadow-sm hover:shadow-md hover:scale-[1.01] transition duration-300 will-change-transform ease-out min-w-[297.6px]"
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
      <CardContent className="pb-4">
        <CardTitle className="font-semibold">{recipe.recipeName}</CardTitle>
        <CardDescription>
          <TruncatedText
            text={recipe.description}
            maxLength={40}
            className="text-gray-600 my-3"
          />

          {/* Icons for Time & Difficulty */}
          <div className="text-sm text-gray-500 flex justify-between items-center mt-2 mb-4">
            <div className="flex items-center gap-1 ">
              <Clock className="w-4 h-4 text-green-700" /> {recipe.totalTime}
            </div>
            <div className="flex items-center gap-1 ">
              <Zap className="w-4 h-4 text-green-700" /> {recipe.difficulty}
            </div>

            <FTContentModal
              title="Customize Your Meal"
              description="Customize your meal by your preference :)"
              btnText="Customize"
              // hideFooter
              isNormalBtn={true}
              icon={<Settings className="w-4 h-4 text-green-600 " />}
              btnSize="sm"
              btnVariant="ghost"
              btnColor="green-700"
            >
              {(close) => {
                const onSubmit = (data: ICustomization) => {
                  toast.success('Your customization is applied!');
                  console.log('Form Submitted:', data);
                  // You can save to Redux, DB, etc.
                  const selectedSpice = spiceMap[data.spiceLevel];

                  setCustomization({ ...data, spiceLevel: selectedSpice });
                  close();
                };

                return (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6  "
                    >
                      {/* Dietary Preference */}
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="dietaryPreference"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Choose one or more</FormLabel>
                              <FormControl>
                                <div className="flex flex-wrap gap-3">
                                  {tags?.map((option) => {
                                    const isSelected =
                                      field.value?.includes(option);

                                    return (
                                      <Button
                                        key={option}
                                        type="button"
                                        size="sm"
                                        variant={
                                          isSelected ? 'default' : 'outline'
                                        }
                                        className={cn(
                                          'rounded-full text-sm transition',
                                          isSelected &&
                                            'bg-green-600 text-white hover:bg-green-500'
                                        )}
                                        onClick={() => {
                                          const valueArr = Array.isArray(
                                            field.value
                                          )
                                            ? field.value
                                            : [];

                                          const alreadySelected =
                                            valueArr?.includes(option);
                                          const updated = alreadySelected
                                            ? valueArr.filter(
                                                (v) => v !== option
                                              )
                                            : [...(field.value || []), option];
                                          field.onChange(updated);
                                        }}
                                      >
                                        {option}
                                      </Button>
                                    );
                                  })}
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {preferences && preferences.length > 0 && (
                          <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                            <Info className="w-3 h-3" />
                            Your preferences are applied by default
                          </span>
                        )}
                      </div>

                      {/* Spice Level */}
                      <FormField
                        control={form.control}
                        name="spiceLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Spice Level</FormLabel>
                            <FormControl>
                              <div>
                                <Slider
                                  value={[field.value]}
                                  onValueChange={(val) =>
                                    field.onChange(val[0])
                                  }
                                  min={0}
                                  max={4}
                                  step={1}
                                />
                                <p className="text-sm text-muted-foreground mt-1">
                                  Current: {field.value} / 4
                                </p>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Optional Ingredients */}
                      <FormField
                        control={form.control}
                        name="ingredients"
                        render={() => (
                          <FormItem>
                            <FormLabel>Optional Ingredients</FormLabel>
                            <div className="flex flex-wrap gap-3">
                              {optionalIngredients.map((item) => (
                                <FormField
                                  key={item}
                                  control={form.control}
                                  name="ingredients"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={item}
                                        className="flex items-center gap-2 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(
                                              item
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...field.value,
                                                    item,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (v) => v !== item
                                                    )
                                                  );
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="text-sm font-normal">
                                          {item}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex items-center gap-2 text-sm text-green-600 bg-green-100 rounded-md px-3 py-2 mt-2">
                        <Smile className="w-4 h-4" />
                        No extra charge needed for this customization 😊
                      </div>

                      <Button type="submit" className="mt-4 w-full">
                        Save Customization
                      </Button>
                    </form>
                  </Form>
                );
              }}
            </FTContentModal>
          </div>
        </CardDescription>
        <CardFooter className="px-0">
          <Button
            size="sm"
            // variant="secondary"
            onClick={() => handleAddMeals(recipe)}
            className="w-full flex items-center  gap-2 cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4 text-white" />
            Cart
          </Button>
        </CardFooter>
      </CardContent>{' '}
    </Card>
  );
}

export default MyPlanCard;
