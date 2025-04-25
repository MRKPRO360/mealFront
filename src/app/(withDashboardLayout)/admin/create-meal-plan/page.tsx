'use client';
import CreateMealPlanForm from '@/components/modules/dashboard/customer/create-meal-plan';

import { getAllRecipesNameAndId } from '@/services/RecipeService';
import { useEffect, useState } from 'react';

function CreateMyMealPlan() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getAllRecipesNameAndId().then(({ data }) => {
      setRecipes(data);
    });
  }, []);

  return <CreateMealPlanForm isCustomer={false} recipes={recipes} />;
}

export default CreateMyMealPlan;
