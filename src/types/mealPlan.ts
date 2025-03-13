import { IRecipe } from './recipe.interface';

export interface IMealPlan {
  week: string;
  selectedMeals: IRecipe[];
}
