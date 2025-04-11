'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { IMeta, IUser } from '@/types';
import Link from 'next/link';
import { Filter, Heart, MapPin, Search, Star, Utensils, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import TablePagination from '@/components/ui/core/FTTable/TablePagination';

export default function AllProviders({
  providers,
  meta,
  cuisines,
}: {
  providers: IUser[];
  meta: IMeta;
  cuisines: string[];
}) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const form = useForm({
    defaultValues: {
      search: searchParams.get('search') || '',
      filter: searchParams.get('filter') || 'all',
      cuisine: searchParams.get('cuisine') || 'all',
    },
  });

  const handleSearchQuery = (query: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(query, value);
    } else {
      params.delete(query);
    }

    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };

  const hasFilters =
    form.watch('search') ||
    form.watch('filter') !== 'all' ||
    form.watch('cuisine') !== 'all';

  const clearFilters = () => {
    form.reset({
      search: '',
      filter: 'all',
      cuisine: 'all',
    });
    router.push(pathName, { scroll: false });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleSearchQuery('searchTerm', data.search);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Discover Top Catering Providers
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find the perfect chef or catering service for your next event from our
          curated list of professionals.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <FormField
                  control={form.control}
                  name="search"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div>
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search providers..."
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Filter Dropdowns */}
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="filter"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleSearchQuery('filter', value);
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[180px]">
                            <div className="flex items-center">
                              <Filter className="h-4 w-4 mr-2" />
                              <span>
                                {field.value === 'all'
                                  ? 'Filter'
                                  : field.value.replace('-', ' ')}
                              </span>
                            </div>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="all">All Providers</SelectItem>
                          <SelectItem value="top-rated">Top Rated</SelectItem>
                          <SelectItem value="newest">Newest</SelectItem>
                          <SelectItem value="popular">Most Popular</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cuisine"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleSearchQuery('cuisine', value);
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Cuisine" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="all">All Cuisines</SelectItem>

                          {cuisines.map((el, id) => (
                            <SelectItem key={id} value={el}>
                              {el}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {/* Clear Filters Button */}
                {hasFilters && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={clearFilters}
                    className="
                    bg-destructive rounded-[3px] text-white shadow-xs hover:bg-destructive/80 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40
                    border-input focus-visible:border-ring  aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex p-3 h-8 sm:h-11 md:w-full items-center justify-between gap-2  border px-3 py-2 text-sm whitespace-nowrap  transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                  >
                    <X />
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>

      {/* Providers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {providers.map((provider) => (
          <Card
            key={provider._id}
            className="shadow-xs hover:shadow-sm transition-shadow duration-300 group"
          >
            <CardHeader className="p-0">
              <div className="relative">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <Image
                    width={300}
                    height={200}
                    src={provider.profileImg || ''}
                    alt={`${provider.name.firstName} ${provider.name.lastName}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full p-2 h-8 w-8"
                >
                  <Heart className="h-4 w-4 text-rose-500" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-white -mt-8 shadow-md">
                    <AvatarImage src={provider.profileImg} />
                    <AvatarFallback>
                      {provider.name.firstName.charAt(0)}
                      {provider.name.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">
                      {provider.name.firstName} {provider.name.lastName}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {provider.rating} ({provider.ratingsCount})
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{provider?.address?.city}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {provider?.cuisineSpecialties?.slice(0, 3).map((cuisine) => (
                    <Badge
                      key={cuisine}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <Utensils className="h-3 w-3" />
                      {cuisine}
                    </Badge>
                  ))}
                  {provider?.cuisineSpecialties &&
                    provider?.cuisineSpecialties?.length > 3 && (
                      <Badge variant="outline">
                        +{provider.cuisineSpecialties.length - 3}
                      </Badge>
                    )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="px-1 sm:px-3 pb-2">
              <Link href={`/customer/all-providers/${provider._id}`}>
                <Button size="sm">View Profile</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center">
        <TablePagination totalPage={meta.totalPage} />
        {/* <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button size="sm">2</Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div> */}
      </div>
    </div>
  );
}
