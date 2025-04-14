'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { IMealPlan } from '@/types';
import { FTModal } from '@/components/ui/core/FTModal';
import Image from 'next/image';

import { Edit, Trash } from 'lucide-react';
import Link from 'next/link';
import {
  deleteMealPlanForWeek,
  removeMealFromWeek,
  revalidateMealPlans,
} from '@/services/MealPlanService';

const CustomizeMealPlan = ({ myMealPlan }: { myMealPlan: IMealPlan[] }) => {
  const deleteMeal = async (weekId: string, mealId: string) => {
    try {
      const res = await removeMealFromWeek(weekId, mealId);

      if (res.success) {
        await revalidateMealPlans();
        toast.success('Meal removed successfully!');
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || 'Failed to remove meal :(');
    }
  };

  const deleteWeek = async (weekId: string) => {
    try {
      const res = await deleteMealPlanForWeek(weekId);

      if (res.success) {
        await revalidateMealPlans();
        toast.success('Weekly meal plan deleted!');
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || 'Failed to delete weekly plan :(');
    }
  };

  return (
    <div className="container mx-auto px-3 min-h-screen mt-14 mb-4 space-y-6">
      {myMealPlan.length === 0 ? (
        <p className="text-center text-gray-500">No meal plans available.</p>
      ) : (
        myMealPlan.map((plan, index) => (
          <Card key={index} className="p-4 shadow-xs">
            <h2 className="text-xl font-semibold mb-4">
              Week: {format(new Date(plan.week), 'MMMM dd, yyyy')}
            </h2>
            <div className="space-y-3">
              {plan.selectedMeals.map((meal) => (
                <div
                  key={meal._id}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded-xs transition duration-300 border-transparent border hover:border-gray-300"
                >
                  <Link
                    href={`/recipe/${meal._id}`}
                    className="flex items-center gap-4 transition duration-300 ease-in font-semibold  hover:underline hover:text-green-700"
                  >
                    <Image
                      width={56}
                      height={56}
                      src={meal.recipeImage}
                      alt={meal.recipeName}
                      className="w-14 h-14 rounded-md object-cover"
                    />
                    <p>{meal.recipeName}</p>
                  </Link>

                  <FTModal
                    title={`Are you sure to delete Week: ${format(
                      new Date(plan.week),
                      'MMMM dd, yyyy'
                    )}?`}
                    description="This action cannot be undone. This will permanently delete your weekly plan :("
                    onConfirm={() => deleteMeal(plan.week, meal._id)}
                  >
                    <div className="flex items-center justify-center w-10 h-10 hover:bg-white rounded-full transition duration-500 ease-in-out cursor-pointer">
                      <Trash className="w-5 h-5 text-red-700 " />
                    </div>
                  </FTModal>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <FTModal
                title={`Are you sure to delete Week: ${format(
                  new Date(plan.week),
                  'MMMM dd, yyyy'
                )}?`}
                description="This action cannot be undone. This will permanently delete your weekly plan :("
                onConfirm={() => deleteWeek(plan.week)}
              >
                <Button className="w-full" variant="outline">
                  <Trash className="text-red-700" /> Delete Entire Week
                </Button>
              </FTModal>
              <Link href={`/admin/update-meal-plan/${plan.week}`}>
                <Button className="" variant="outline">
                  <Edit className="text-green-700" /> Update Weekly Plan
                </Button>
              </Link>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default CustomizeMealPlan;
