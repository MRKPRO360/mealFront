'use client';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import ImagePreviewer from '@/components/ui/core/FTImageUploader/ImagePreviewer';
import FTImageUploader from '@/components/ui/core/FTImageUploader';
import { recipeSchema } from './recipeSchema';
import { toast } from 'sonner';

import { IMenuName } from '@/types';
import { getAllMenuNames } from '@/services/MenuNameService';
import { createMyRecipe } from '@/services/RecipeService';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { TimeDurationPicker } from '@/components/ui/core/FTTimeInput';
import FTSectionHeader from '@/components/ui/core/FTSectionHeader';

type RecipeFormValues = z.infer<typeof recipeSchema>;

export default function CreateMeal() {
  const router = useRouter();
  const { user } = useUser();

  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const [menuNames, setMenuNames] = useState<IMenuName[]>([]);

  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      recipeName: '',
      recipeMenuName: menuNames.length > 0 ? menuNames[0]._id : '',
      description: '',
      tags: [{ name: '' }],
      allergens: [{ name: '' }],
      totalTime: '',
      prepTime: '',
      difficulty: 'Easy',
      ingredients: [{ name: '', quantity: '' }],
      nutritionValues: {
        calories: '',
        fat: '',
        saturatedFat: '',
        carbohydrate: '',
        sugar: '',
        dietaryFiber: '',
        protein: '',
        cholesterol: '',
        sodium: '',
      },
      utensils: [{ name: '' }], // Or you can initialize this as [] if you prefer
      instructions: [{ step: 1, description: '' }],
      portionSizes: {
        small: { price: '', servings: '' },
        medium: { price: '', servings: '' },
        large: { price: '', servings: '' },
      },
      quantity: '20',
    },
  });

  useEffect(() => {
    const fetchMenuNames = async () => {
      try {
        const { data } = await getAllMenuNames();
        setMenuNames(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMenuNames();
  }, []);

  useEffect(() => {
    if (menuNames.length > 0) {
      form.setValue('recipeMenuName', menuNames[0]._id); // Set first option as default
    }
  }, [menuNames, form.setValue, form]);

  const {
    formState: { isSubmitting, errors },
  } = form;

  const {
    fields: ingredientFields,
    append: addIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control: form.control,
    name: 'ingredients',
  });

  const {
    fields: instructionFields,
    append: addInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    control: form.control,
    name: 'instructions',
  });

  const {
    fields: utensilsFields,
    append: addUtensils,
    remove: removeUtensils,
  } = useFieldArray({
    control: form.control,
    name: 'utensils',
  });

  const {
    fields: allergensFields,
    append: addAllergens,
    remove: removeAllergens,
  } = useFieldArray({
    control: form.control,
    name: 'allergens',
  });

  const {
    fields: tagsFields,
    append: addTags,
    remove: removeTags,
  } = useFieldArray({
    control: form.control,
    name: 'tags',
  });

  const onSubmit = async (data: RecipeFormValues) => {
    console.log(errors);

    if (imageFiles.length === 0) {
      return toast.error('A recipe must have a image!');
    }

    const recipeFormData = new FormData();
    recipeFormData.append('file', imageFiles[0]);
    const formattedData = {
      ...data,
      tags: data.tags.map((el) => el.name),
      allergens: data.allergens.map((el) => el.name),
      utensils: data.utensils.map((el) => el.name),

      ingredients: data.ingredients.map((el) => ({
        name: el.name,
        quantity:
          el.quantity == '0' || el.quantity?.length === 0
            ? (el.quantity = 'Not included in delivery')
            : el.quantity,
      })),
      providerId: user?.id,
    };
    recipeFormData.append('data', JSON.stringify(formattedData));

    console.log('Form Data:', formattedData);

    try {
      const res = await createMyRecipe(recipeFormData);
      console.log(res);

      if (res.success) {
        toast.success('Recipe created successfully!');
        router.push('/provider/my-meal');
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Failed to create recipe!');
    }
  };

  return (
    <div
      style={{
        width: 'calc(100% - 20px)',
      }}
      className="sm:max-w-[480px] lg:max-w-[800px] mx-auto bg-white/80 py-8 px-2 border mt-14 mb-4"
    >
      {/* <h1 className="text-center text-xl md:text-2xl text-thin mb-8">
        Add your recipe
      </h1> */}
      <div className="text-center">
        <FTSectionHeader className="font-medium mb-4">
          Add Your Recipe
        </FTSectionHeader>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Card className="p-4">
            <h2 className="text-xl font-bold">Recipe Details</h2>
            <FormField
              control={form.control}
              name="recipeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipe Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Recipe Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="recipeMenuName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Menu Name</FormLabel>
                  <FormControl>
                    <select
                      defaultValue={menuNames[0]?._id}
                      {...field}
                      className="border rounded p-2 w-full"
                    >
                      {menuNames.map((menuName: IMenuName) => (
                        <option key={menuName._id} value={menuName._id}>
                          {menuName.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {imagePreview.length > 0 ? (
              <ImagePreviewer
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
            ) : (
              <div>
                <FTImageUploader
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                  label="Upload Recipe Image"
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a short description..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <TimeDurationPicker control={form.control} name="totalTime" />

            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty</FormLabel>
                  <FormControl>
                    <select {...field} className="border rounded p-2 w-full">
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter quantity"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Prep Time */}

            <TimeDurationPicker
              label="Preparation Time"
              control={form.control}
              name="prepTime"
            />

            {/* Allergens */}
            <h2 className=" font-semibold text-lg">Allergens</h2>

            {allergensFields.map((field, index) => (
              <div key={field.id}>
                <FormField
                  control={form.control}
                  name={`allergens.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Allergens</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter allergens" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="mt-4"
                  variant="destructive"
                  size="sm"
                  type="button"
                  onClick={() => removeAllergens(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              type="button"
              onClick={() => addAllergens({ name: '' })}
            >
              Add Allergens
            </Button>

            <h2 className=" font-semibold text-lg">Tags</h2>

            {tagsFields.map((field, index) => (
              <div key={field.id}>
                <FormField
                  control={form.control}
                  name={`tags.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter tag name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="mt-4"
                  variant="destructive"
                  size="sm"
                  type="button"
                  onClick={() => removeTags(index)}
                >
                  Remove
                </Button>
              </div>
            ))}

            <Button
              variant="outline"
              type="button"
              onClick={() => addTags({ name: '' })}
            >
              Add Tag
            </Button>

            {/* Portion Sizes */}
            <h3 className="text-lg font-semibold mt-4">Portion Sizes</h3>

            {['small', 'medium', 'large'].map((size) => (
              <div key={size} className="grid sm:grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name={
                    `portionSizes.${size}.price` as
                      | 'portionSizes.small.price'
                      | 'portionSizes.medium.price'
                      | 'portionSizes.large.price'
                  }
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {size.charAt(0).toUpperCase() + size.slice(1)} Price
                      </FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Price" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={
                    `portionSizes.${size}.servings` as
                      | 'portionSizes.small.servings'
                      | 'portionSizes.medium.servings'
                      | 'portionSizes.large.servings'
                  }
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {size.charAt(0).toUpperCase() + size.slice(1)} Servings
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Servings"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}

            <h3 className="text-lg font-semibold mt-4">Nutrition Values</h3>
            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
              {Object.keys(form.getValues().nutritionValues || {}).map(
                (key, index, array) => (
                  <FormField
                    key={key}
                    control={form.control}
                    name={`nutritionValues.${
                      key as keyof RecipeFormValues['nutritionValues']
                    }`}
                    render={({ field }) => (
                      <FormItem
                        className={
                          index === array.length - 1 ? 'col-span-2' : ''
                        }
                      >
                        <FormLabel>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="amount g/kcal/cal"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              )}
            </div>
          </Card>

          <Card className="p-4">
            <h2 className="text-lg font-semibold md:text-md">Ingredients</h2>
            {ingredientFields.map((field, index) => (
              <div key={field.id}>
                <div className="grid sm:grid-cols-2 gap-2 mb-4">
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ingredient Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Ingredient Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="amount tablespoon/bunch/unit cloves"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  type="button"
                  onClick={() => removeIngredient(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              type="button"
              onClick={() => addIngredient({ name: '', quantity: '' })}
            >
              Add Ingredient
            </Button>
          </Card>

          <Card className="p-4">
            <h2 className=" font-semibold text-lg">Instructions</h2>
            {instructionFields.map((field, index) => (
              <div key={field.id}>
                <div className="grid sm:grid-cols-2 gap-2 mb-4">
                  <FormField
                    control={form.control}
                    name={`instructions.${index}.step`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Step</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Step" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`instructions.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  type="button"
                  onClick={() => removeInstruction(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              type="button"
              onClick={() =>
                addInstruction({
                  step: instructionFields.length + 1,
                  description: '',
                })
              }
            >
              Add Step
            </Button>
          </Card>

          <Card className="p-4">
            <h2 className=" font-semibold text-lg">Utensils</h2>

            {utensilsFields.map((field, index) => (
              <div key={field.id}>
                <FormField
                  control={form.control}
                  name={`utensils.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Utensil</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter utensil name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="mt-4"
                  variant="destructive"
                  size="sm"
                  type="button"
                  onClick={() => removeUtensils(index)}
                >
                  Remove
                </Button>
              </div>
            ))}

            <Button
              variant="outline"
              type="button"
              onClick={() => addUtensils({ name: '' })}
            >
              Add Utensil
            </Button>
          </Card>

          <Button disabled={isSubmitting} className="w-full" type="submit">
            {isSubmitting ? 'Submiting...' : 'Submit Recipe'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
