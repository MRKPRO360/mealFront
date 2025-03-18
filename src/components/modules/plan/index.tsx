'use client';

import { getMealPlanForWeek, getRecentPlans } from '@/services/MealPlanService';
import { IMealPlan, IRecipe } from '@/types';

import { useState, useEffect } from 'react';
import PlanCard from './PlanCard';
import PlanCardSkeleton from '@/components/ui/core/PlanCardSkeleton';

// Function to format weeks dynamically
const formatWeekTabs = (mealPlans: IMealPlan[]) => {
  return mealPlans
    .map((plan) => {
      const date = new Date(plan.week);
      const month = date.toLocaleString('en-US', { month: 'short' }); // 'Mar', 'Apr'
      const year = date.getFullYear();
      const startDate = date.getDate();

      // Stop generating if the start date is greater than 28
      if (startDate > 28) return null;

      // Get last day of the month
      const lastDayOfMonth = new Date(year, date.getMonth() + 1, 0).getDate();

      // Ensure end date does not exceed the month's last day
      const endDate = Math.min(startDate + 7, lastDayOfMonth);

      return {
        label: { month, duration: `${startDate}-${endDate}` },
        value: plan.week,
      };
    })
    .filter(Boolean); // Remove null values
};
interface IWeekTabs {
  label: { month: string; duration: string };
  value: string;
}

const Plan = () => {
  const [weekTabs, setWeekTabs] = useState<IWeekTabs[]>([]);

  const [selectedWeek, setSelectedWeek] = useState(''); // Default to current week
  const [mealPlan, setMealPlan] = useState<IMealPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch meal plans from backend
    const fetchRecentPlans = async () => {
      setIsLoading(true);

      try {
        const data = await getRecentPlans();

        if (data?.data) {
          const formattedTabs = formatWeekTabs(data.data);
          setWeekTabs(formattedTabs as IWeekTabs[]);

          // Auto-select the first available week
          if (formattedTabs.length > 0) {
            setSelectedWeek((formattedTabs as IWeekTabs[])[0].value);
          }
        }
      } catch (err) {
        console.error('Error fetching recent plans:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentPlans();
  }, []);

  useEffect(() => {
    if (!selectedWeek) return;

    const fetchMealPlan = async () => {
      setIsLoading(true);
      try {
        const data = await getMealPlanForWeek(selectedWeek);
        setMealPlan(data.data);
      } catch (error) {
        console.error('Error fetching meal plan :(', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMealPlan();
  }, [selectedWeek]);

  const getShortMonthName = selectedWeek
    ? new Date(selectedWeek).toLocaleString('en-US', { month: 'short' })
    : '';

  const duration = weekTabs
    ?.map((el) => {
      if (el.label.month === getShortMonthName && el.value === selectedWeek) {
        return el.label.duration;
      }
    })
    .filter((el) => el !== undefined);

  return (
    <div className="container mx-auto px-3 min-h-screen mt-14 mb-4">
      {selectedWeek && (
        <h2 className="text-2xl font-bold text-center">
          Menu for <span>{getShortMonthName}</span> <span>{duration}</span>
        </h2>
      )}

      <div className="flex justify-center mt-4 mb-6 space-x-2">
        {weekTabs.map((week) => (
          <button
            key={week.value}
            onClick={() => setSelectedWeek(week.value)}
            className={`px-6 py-3 rounded-md transition-all duration-300 shadow-md 
              cursor-pointer
        ${
          selectedWeek === week.value
            ? 'bg-green-700 text-white border border-transparent'
            : 'bg-white text-black border border-green-700 hover:bg-green-100'
        }`}
          >
            <div className="flex flex-col items-center">
              <span className="text-sm font-semibold">{week.label.month}</span>
              <span className="text-xs">{week.label.duration}</span>
            </div>
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <PlanCardSkeleton key={index} />
          ))}
        </div>
      ) : mealPlan ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 justify-between">
          {mealPlan?.selectedMeals?.map((recipe: IRecipe) => (
            <PlanCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      ) : mealPlan && (mealPlan as IMealPlan[])?.length <= 0 ? (
        <p className="text-center mt-4 text-gray-500">
          No meal plan available for this week.
        </p>
      ) : (
        ''
      )}
    </div>
  );
};

export default Plan;
