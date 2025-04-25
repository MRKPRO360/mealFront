'use client';

import { IMealPlan, IRecipe } from '@/types';

import { useState, useEffect, useMemo } from 'react';

import {
  getMyMealPlanForWeek,
  getMyRecentPlans,
} from '@/services/PersonalMealPlanService';
import PlanCardSkeleton from '../../../../ui/core/PlanCardSkeleton';
import { getMealPlanForWeek, getRecentPlans } from '@/services/MealPlanService';
import MyPlanCard from '@/components/modules/myMenu/MyPlanCard';
import { getMyPreferences } from '@/services/AuthService';
import { dietaryPreferences } from '@/constants/preference';
import { Frown } from 'lucide-react';
import { useUser } from '@/context/UserContext';

// Function to format weeks dynamically

const formatWeekTabs = (mealPlans: IMealPlan[]) => {
  const allowedDates = [1, 8, 15, 22];

  return mealPlans
    .map((plan) => {
      const date = new Date(plan.week);
      const startDate = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      if (!allowedDates.includes(startDate)) return null;

      // Get the last day of the month
      const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

      // Determine the end date
      const endDate = startDate === 22 ? lastDayOfMonth : startDate + 6; // 7-day range

      return {
        label: {
          month: date.toLocaleString('en-US', { month: 'short' }),
          duration: `${startDate}-${endDate}`,
        },
        value: plan.week,
      };
    })
    .filter(Boolean); // Remove nulls
};

interface IWeekTabs {
  label: { month: string; duration: string };
  value: string;
}

const MyMealPlan = ({ isCustomer = true }: { isCustomer?: boolean }) => {
  const { user } = useUser();

  const [weekTabs, setWeekTabs] = useState<IWeekTabs[]>([]);

  const [selectedWeek, setSelectedWeek] = useState(''); // Default to current week
  const [mealPlan, setMealPlan] = useState<IMealPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [preferences, setPreferences] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>(['']);

  const dietaryOptions = useMemo(() => [...dietaryPreferences], []);

  useEffect(() => {
    const storedTags = localStorage.getItem('tags');

    if (storedTags) {
      setTags(JSON.parse(storedTags));
    } else {
      setTags(dietaryOptions);
    }

    const myPreferences = async () => {
      try {
        const res = await getMyPreferences();
        if (res.success) {
          setPreferences(res?.data?.dietaryPreferences);
        } else {
          console.log(res.message || 'Something went wrong');
        }
      } catch (err) {
        console.log(err);
      }
    };

    myPreferences();
  }, [dietaryOptions]);

  useEffect(() => {
    const fetchRecentPlans = async () => {
      setIsLoading(true);
      try {
        const data = isCustomer
          ? await getMyRecentPlans()
          : await getRecentPlans();

        if (data?.data) {
          const formattedTabs = formatWeekTabs(data.data);
          setWeekTabs(formattedTabs as IWeekTabs[]);

          if (formattedTabs.length > 0) {
            setSelectedWeek((formattedTabs as IWeekTabs[])[0].value);
          }
        }
      } catch (err) {
        console.log('Error fetching recent plans:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentPlans();
  }, [isCustomer]);

  useEffect(() => {
    if (!selectedWeek) return;

    const fetchMealPlan = async () => {
      setIsLoading(true);
      try {
        const data = isCustomer
          ? await getMyMealPlanForWeek(selectedWeek)
          : await getMealPlanForWeek(selectedWeek);
        setMealPlan(data.data);
      } catch (error) {
        console.error('Error fetching meal plan :(', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMealPlan();
  }, [selectedWeek, isCustomer]);

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
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-between">
          {Array.from({ length: 6 }).map((_, index) => (
            <PlanCardSkeleton key={index} />
          ))}
        </div>
      ) : mealPlan ? (
        mealPlan.selectedMeals?.length > 0 ? (
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 justify-between">
            {mealPlan.selectedMeals.map((recipe: IRecipe) => (
              <MyPlanCard
                userRole={user?.role || 'customer'}
                preferences={preferences}
                tags={tags}
                key={recipe._id}
                recipe={recipe}
              />
            ))}
          </div>
        ) : (
          <div className="flex text-lg font-semibold items-center justify-center text-gray-500 gap-2 w-full h-full">
            <Frown />
            <span>No meal plan available for this week.</span>
          </div>
        )
      ) : (
        <div className="flex text-lg font-semibold items-center justify-center text-gray-500 gap-2 w-full h-full">
          <Frown />
          <span>No meal plan available.</span>
        </div>
      )}
    </div>
  );
};

export default MyMealPlan;
