export const dynamic = 'force-dynamic';

import CustomizeMealPlan from '@/components/modules/dashboard/admin/customize-meal-plan';
import { getAllMealPlans } from '@/services/MealPlanService';

async function CustomizeMyMealPlanPage() {
  const { data } = await getAllMealPlans();

  return <CustomizeMealPlan myMealPlan={data} />;
}

export default CustomizeMyMealPlanPage;
