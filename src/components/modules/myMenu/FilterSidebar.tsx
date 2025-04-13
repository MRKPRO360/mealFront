'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Star } from 'lucide-react';

export default function FilterSidebar({ tags }: { tags: string[] }) {
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

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Availability</h2>
        <RadioGroup className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              onClick={() => handleSearchQuery('inStock', 'true')}
              value="true"
              id="inStock-true"
            />
            <Label htmlFor="inStock-true" className="text-gray-500 font-light">
              In Stock
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              onClick={() => handleSearchQuery('inStock', 'false')}
              value="false"
              id="inStock-false"
            />
            <Label htmlFor="inStock-false" className="text-gray-500 font-light">
              Out of Stock
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Dietarry Preferences */}
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

      {/* Rating */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Rating</h2>
        <RadioGroup className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <RadioGroupItem
                onClick={() => handleSearchQuery('minRating', rating)}
                value={`${rating}`}
                id={`rating-${rating}`}
              />
              <Label htmlFor={`rating-${rating}`} className="flex items-center">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    size={18}
                    key={i}
                    fill={i < rating ? 'orange' : 'lightgray'}
                    stroke={i < rating ? 'orange' : 'lightgray'}
                  />
                ))}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
