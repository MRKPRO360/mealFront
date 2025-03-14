'use client';
import { IRecipe } from '@/types';
import { useEffect, useState } from 'react';
import AllRecipes from './AllRecipes';
import FilterSidebar from './FilterSidebar';
import { Input } from '@/components/ui/input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Search } from 'lucide-react';

function MyPlan({ recipes }: { recipes: IRecipe[] }) {
  const [tags, setTags] = useState<string[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearchQuery = (query: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set(query, value.toString());

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  useEffect(() => {
    const storedTags = localStorage.getItem('tags');
    if (!storedTags) {
      localStorage.setItem(
        'tags',
        JSON.stringify([...new Set(recipes.flatMap((recipe) => recipe.tags))])
      );
    }
    setTags(JSON.parse(localStorage.getItem('tags') || '[]'));
  }, []);

  const form = useForm();

  const {
    formState: { isSubmitting },
  } = form;

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
                      className="shadow-xs p-4 rounded-full"
                      type="text"
                      {...field}
                      value={field.value || ''}
                      placeholder="Search by dietary preferences, ratings, availability etc..."
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

      <div className="flex gap-8 my-10">
        <div className="w-full max-w-3xs">
          <FilterSidebar tags={tags} />
        </div>
        <div>
          <AllRecipes recipes={recipes} />
        </div>
      </div>
    </div>
  );
}

export default MyPlan;
