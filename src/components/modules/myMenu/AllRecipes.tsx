'use client';
import { IRecipe } from '@/types';
import MyPlanCard from './MyPlanCard';
import { Frown } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { getMyPreferences } from '@/services/AuthService';
import { dietaryPreferences } from '@/constants/preference';

function AllRecipes({ recipes }: { recipes: IRecipe[] }) {
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

  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center text-muted-foreground grid place-content-center w-[90vw] md:w-[75vw] lg:w-[60vw] h-[50vh] ">
        <div className="flex items-center gap-2 text-gray-400 text-lg font-medium">
          <Frown className="w-8 h-8 " />
          No recipes found for the selected filters.
        </div>
        <p className="text-sm mt-1">
          Try adjusting your search or filter options.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-2 place-items-stretch">
      {recipes?.map((recipe: IRecipe) => (
        <MyPlanCard
          preferences={preferences}
          tags={tags}
          key={recipe._id}
          recipe={recipe}
        />
      ))}
    </div>
  );
}

export default AllRecipes;
