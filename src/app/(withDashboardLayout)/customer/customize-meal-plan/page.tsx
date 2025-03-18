import CustomizeMyMealPlan from '@/components/modules/dashboard/customer/customize-meal-plan';
import { getMyAllMealPlans } from '@/services/PersonalMealPlanService';

async function CustomizeMyMealPlanPage() {
  const { data } = await getMyAllMealPlans();

  return (
    <div>
      <CustomizeMyMealPlan myMealPlan={data} />
    </div>
  );
}

export default CustomizeMyMealPlanPage;
