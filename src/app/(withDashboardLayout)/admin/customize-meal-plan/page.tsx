import CustomizeMealPlan from '@/components/modules/dashboard/admin/customize-meal-plan';
import { getAllMealPlans } from '@/services/MealPlanService';

async function CustomizeMyMealPlanPage() {
  const { data } = await getAllMealPlans();

  return (
    <div>
      <CustomizeMealPlan myMealPlan={data} />
    </div>
  );
}

export default CustomizeMyMealPlanPage;
