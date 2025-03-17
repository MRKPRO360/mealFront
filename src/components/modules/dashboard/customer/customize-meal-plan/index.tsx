import { getMyAllMealPlans } from '@/services/PersonalMealPlanService';

async function CustomizeMyMealPlan() {
  const result = await getMyAllMealPlans();

  console.log(result);

  return <div></div>;
}

export default CustomizeMyMealPlan;
