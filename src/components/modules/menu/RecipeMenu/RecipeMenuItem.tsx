'use client';

import { IRecipe } from '@/types';
import { useEffect, useMemo, useState } from 'react';
import { dietaryPreferences } from '@/constants/preference';
import { getMyPreferences } from '@/services/AuthService';
import MyPlanCard from '../../myMenu/MyPlanCard';

function RecipeMenuItem({
  recipes,
  categoryName,
}: {
  recipes: IRecipe[];
  categoryName: string;
}) {
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

  return (
    <div className="my-10 md:my-18">
      <div className="text-center ">
        <p className="text-green-700 text-base font-semibold">
          Some of {categoryName} recipes
        </p>
        <div className="w-[90px] h-[2.5px] bg-green-700 mx-auto rounded-md mt-1 mb-2"></div>
        <p id={`${categoryName}`} className="text-4xl font-semibold">
          {categoryName} Recipe Menu
        </p>
        <span className="text-[15px] font-medium my-5 inline-block">
          Hearty meals for meat lovers and {categoryName} alike
        </span>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-between">
        {recipes.map((recipe) => (
          // <RecipeCard key={recipe._id} recipe={recipe} />
          // ))}
          <MyPlanCard
            preferences={preferences}
            tags={tags}
            key={recipe._id}
            recipe={recipe}
          />
        ))}
      </div>
    </div>
  );
}

export default RecipeMenuItem;
