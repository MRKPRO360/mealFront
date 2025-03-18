import { IRecipe } from './recipe.interface';

export interface IMealPlan {
  week: string;
  selectedMeals: IRecipe[];
}

export interface IWeeklyPlan {
  week: string;
  selectedMeals: IRecipe[];
  _id: string;
  user: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
