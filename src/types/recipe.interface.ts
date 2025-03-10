export interface IIngredient {
  name: string;
  quantity: string;
  contains?: string[];
}

export interface INutritionValues {
  calories: string;
  fat: string;
  saturatedFat: string;
  carbohydrate: string;
  sugar: string;
  dietaryFiber: string;
  protein: string;
  cholesterol: string;
  sodium: string;
}

export interface IInstruction {
  step: number;
  description: string;
}
export interface IUtensils {
  utensils: string;
}

export interface IRecipe {
  _id: string;
  recipeMenuName: {
    isDeleted: boolean;
    _id: string;
    name: string;
    menuImg: string;
  };
  recipeImage: string;
  recipeName: string;
  description: string;
  tags: string[];
  allergens: string[];
  totalTime: string;
  prepTime: string;
  difficulty: string;
  ingredients: IIngredient[];
  nutritionValues: INutritionValues;
  utensils: IUtensils[];
  instructions: IInstruction[];
  isDeleted: boolean;
}
