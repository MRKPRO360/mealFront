'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function FilterSidebar({ tags }: { tags: string[] }) {
  //   const [isLoading, setIsLoading] = useState(false);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       //   setIsLoading(true);
  //       setIsLoading(false);
  //       try {
  //         // const [{ data: categoriesData }, { data: brandsData }] =
  //         //   await Promise.all([getAllCategories(), getAllBrands()]);
  //         // setCategories(categoriesData);
  //         // setBrands(brandsData);
  //       } catch (error: any) {
  //         console.error(error);
  //         toast.error('Failed to fetch filters');
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };

  //     fetchData();
  //   }, []);

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

  return (
    <div className="p-6 bg-white rounded-xs">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Filter</h2>
        {searchParams.toString().length > 0 && (
          <Button
            onClick={() => {
              router.push(`${pathname}`, {
                scroll: false,
              });
            }}
            size="sm"
            className="bg-black hover:bg-gray-700 ml-5"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Product Types */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Dietary Preference</h2>
        {/* {!isLoading && ( */}
        <RadioGroup className="space-y-2">
          {tags?.map((tag, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem
                onClick={() => handleSearchQuery('tags', tag)}
                value={tag}
                id={tag}
              />
              <Label htmlFor={tag} className="text-gray-500 font-light">
                {tag}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {/* )} */}
      </div>
    </div>
  );
}
