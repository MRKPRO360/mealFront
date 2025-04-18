import { z } from 'zod';

// Zod schema for validation
export const updateRecipeSchema = z.object({
  recipeName: z.string().min(3, 'Recipe name must be at least 3 characters'),
  recipeMenuName: z.string().min(3, 'Recipe menu name must be provided'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  tags: z
    .array(
      z.object({
        name: z.string().min(1, 'Tag is required'),
      })
    )
    .min(1, { message: 'At least one tag is required' }),
  allergens: z.array(
    z.object({
      name: z.string().optional(),
    })
  ),
  totalTime: z.string().min(1, 'Recipe name must have a total time'),
  prepTime: z.string().min(1, 'Recipe name must have a prep time'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(3, { message: 'Ingredient name is required' }),
        quantity: z.string().optional(),
      })
    )
    .min(1, { message: 'At least one ingredient is required' }),
  nutritionValues: z.object({
    calories: z.string(),
    fat: z.string(),
    saturatedFat: z.string(),
    carbohydrate: z.string(),
    sugar: z.string(),
    dietaryFiber: z.string(),
    protein: z.string(),
    cholesterol: z.string(),
    sodium: z.string(),
  }),
  utensils: z
    .array(
      z.object({
        name: z.string().min(1, 'Utensil name is required'),
      })
    )
    .min(1, { message: 'At least one utensil is required' }),

  instructions: z
    .array(
      z.object({
        step: z.number().min(1, 'Step is required'),
        description: z.string().min(1, 'Description is required'),
      })
    )
    .min(1, { message: 'At least one instruction is required' }),
  portionSizes: z.object({
    small: z.object({
      price: z.string().min(1, 'Recipe small portion must have a price'),
      servings: z.string().min(1, 'Recipe small portion must have a serving'),
    }),
    medium: z.object({
      price: z.string().min(1, 'Recipe medium portion must have a price'),
      servings: z.string().min(1, 'Recipe medium portion must have a serving'),
    }),
    large: z.object({
      price: z.string().min(1, 'Recipe large portion must have a price'),
      servings: z.string().min(1, 'Recipe large portion must have a serving'),
    }),
  }),

  quantity: z.string().min(1, 'Quantity is required'),
});
