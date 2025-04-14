'use client';

import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

import { toast } from 'sonner';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import MultipleSelector, {
  Option,
} from '@/components/ui/core/MulitpleSelector';

import { IRecipe, IWeeklyPlan } from '@/types';
import { updateWeeklyPersonalPlan } from '@/services/PersonalMealPlanService';
import { useEffect, useState } from 'react';
import { updateWeeklyPlan } from '@/services/MealPlanService';

function UpdateMealPlanForm({
  isCustomer = true,
  recipes,
  weeklyPlan,
}: {
  recipes: IRecipe[];
  weeklyPlan: IWeeklyPlan;
  isCustomer: boolean;
}) {
  const OPTIONS: Option[] = recipes.map((recipe) => ({
    label: recipe.recipeName,
    value: recipe._id,
  }));

  const allowedDays = [7, 14, 21, 28];

  const getClosestAllowedDate = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const todayDate = today.getDate();

    // Find the closest allowed date
    const closestDate =
      allowedDays.find((day) => day >= todayDate) || allowedDays[0];

    return new Date(currentYear, currentMonth, closestDate);
  };

  const [selectedDate, setSelectedDate] = useState<Date | string | undefined>(
    weeklyPlan.week || getClosestAllowedDate()
  );

  useEffect(() => {
    if (weeklyPlan.week) return;
    setSelectedDate(getClosestAllowedDate());
  }, []);

  const router = useRouter();

  const form = useForm({
    defaultValues: {
      week: weeklyPlan.week,
      selectedMeals: weeklyPlan.selectedMeals,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const myMealPlanData = {
      selectedMeals: data?.selectedMeals?.map((recipe: IRecipe) => recipe._id),
      week: new Date(selectedDate!).toISOString(),
    };

    try {
      if (!data.selectedMeals.length) {
        toast.error('Please select at least one recipe!');
        return;
      }
      const res = isCustomer
        ? await updateWeeklyPersonalPlan(weeklyPlan._id, myMealPlanData)
        : await updateWeeklyPlan(weeklyPlan._id, myMealPlanData);

      if (res.success) {
        toast.success('Meal plan updated successfully!');
        router.push(`/${isCustomer ? 'customer' : 'admin'}/meal-plan`);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message || 'Something went wrong!');
    }
  };

  return (
    <div
      style={{
        width: 'calc(100% - 20px)',
      }}
      className="sm:max-w-[480px] lg:max-w-[600px] mx-auto bg-white/80 py-8 px-2 border mt-14 mb-4"
    >
      <h1 className="text-center text-xl md:text-2xl text-thin mb-8">
        Update Your Weekly Plan
      </h1>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            // START DATE OF A WEEK 7,14,21,28
            name="week"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Week</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        disabled={true}
                        variant={'outline'}
                        className={cn(
                          'h-8 sm:h-11 w-full min-w-0 rounded-xs border bg-transparent disabled:cursor-not-allowed',
                          !selectedDate && 'text-muted-foreground'
                        )}
                      >
                        {selectedDate
                          ? format(selectedDate, 'PPP')
                          : 'Pick a date'}{' '}
                        {/* ✅ Show closest date */}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate as Date}
                      onSelect={setSelectedDate}
                      disabled={(date) => {
                        const currentMonth = new Date().getMonth();
                        const currentYear = new Date().getFullYear();
                        return (
                          date.getMonth() !== currentMonth ||
                          date.getFullYear() !== currentYear ||
                          !allowedDays.includes(date.getDate())
                        );
                      }}
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="selectedMeals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meals</FormLabel>
                <FormControl>
                  <MultipleSelector
                    {...field}
                    value={(field?.value as IRecipe[])?.map((val) => ({
                      value: val._id,
                      label: val.recipeName,
                    }))} // ✅ Convert strings to Option objects
                    defaultOptions={OPTIONS}
                    placeholder="Select your meals"
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                    onChange={(selectedOptions) => {
                      // Convert selected `string[]` back to `IRecipe[]`
                      const selectedRecipes = selectedOptions
                        .map(
                          (opt) => recipes.find((r) => r._id === opt.value) // Find full `IRecipe` object
                        )
                        .filter(Boolean) as IRecipe[]; // Filter out any undefined values

                      field.onChange(selectedRecipes);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isSubmitting} type="submit" className="mt-3 w-full">
            {isSubmitting ? 'Updating....' : 'Update'}
          </Button>
        </form>
      </Form>

      <div className="text-center mt-4">
        Don&apos;t want to update your meal plan?{' '}
        <Link
          href="/customer/customize-meal-plan"
          className="text-green-800 underline"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}

export default UpdateMealPlanForm;
