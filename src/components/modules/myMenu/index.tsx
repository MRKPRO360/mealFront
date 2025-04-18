'use client';
import { IRecipe } from '@/types';
import { startTransition, useEffect, useMemo, useState } from 'react';
import AllRecipes from './AllRecipes';
import FilterSidebar from './FilterSidebar';
import { Input } from '@/components/ui/input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { dietaryPreferences } from '@/constants/preference';

function MyMenu({ recipes }: { recipes: IRecipe[] }) {
  const [tags, setTags] = useState<string[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const dietaryOptions = useMemo(() => [...dietaryPreferences], []);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearchQuery = (query: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set(query, value.toString());

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    });
  };

  useEffect(() => {
    // IN CASE IF WE NEED ONLY THE RECIPE TAGS THAT ARE USED IN THE RECIPE AT ONCE!
    // const storedTags = localStorage.getItem('tags');
    // if (!storedTags) {
    //   localStorage.setItem(
    //     'tags',
    //     JSON.stringify([...new Set(recipes.flatMap((recipe) => recipe.tags))])
    //   );
    // }
    // setTags(JSON.parse(localStorage.getItem('tags') || '[]'));

    // IF WE WANT ALL THE RECIPE TAGS
    const storedTags = localStorage.getItem('tags');
    if (!storedTags) {
      localStorage.setItem('tags', JSON.stringify(dietaryOptions));
    }
    setTags(JSON.parse(localStorage.getItem('tags') || '[]'));
  }, [dietaryOptions]);

  const form = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleSearchQuery('searchTerm', data.search);
  };

  return (
    <div className="container mx-auto px-3 min-h-screen pt-14 pb-4">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="relative">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="shadow-xs p-4"
                      type="text"
                      {...field}
                      value={field.value || ''}
                      placeholder="Search by dietary preferences, ratings, etc..."
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <button type="submit">
              <Search className="h-6 w-6 absolute top-2.5 right-6" />
            </button>
          </div>
        </form>
      </Form>

      <div className="lg:hidden relative">
        <Button
          onClick={() => setShowFilter((prevShowFilter) => !prevShowFilter)}
          className="font-semibold shadow-xs p-4 border-input h-8 sm:h-11 w-full min-w-0 border bg-transparent transition-[color,box-shadow] flex justify-start"
          variant="outline"
        >
          {!showFilter ? 'Show Filters' : 'Hide Filters'}
        </Button>

        <Filter className="h-6 w-6 absolute top-2.5 right-6" />
      </div>

      {showFilter && (
        <div className="w-full mt-5 lg:hidden">
          <FilterSidebar tags={tags} />
        </div>
      )}

      <div className="flex gap-8 my-10">
        <div className="w-full max-w-3xs hidden lg:block">
          <FilterSidebar tags={tags} />
        </div>
        <div>
          <AllRecipes recipes={recipes} />
          {/* {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-2 justify-between">
              {Array.from({ length: 6 }).map((_, index) => (
                <MenuCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <AllRecipes recipes={recipes} />
          )} */}
        </div>
      </div>
    </div>
  );
}

export default MyMenu;
