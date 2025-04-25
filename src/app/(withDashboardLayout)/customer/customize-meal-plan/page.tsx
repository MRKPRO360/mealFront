export const dynamic = 'force-dynamic';

import CustomizeMyMealPlan from '@/components/modules/dashboard/customer/customize-meal-plan';
import { getMyAllMealPlans } from '@/services/PersonalMealPlanService';

async function CustomizeMyMealPlanPage() {
  const { data } = await getMyAllMealPlans();

  return <CustomizeMyMealPlan myMealPlan={data} />;
}

export default CustomizeMyMealPlanPage;
