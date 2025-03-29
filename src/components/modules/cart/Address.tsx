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
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cities } from '@/constants/cities';

import { useAppDispatch } from '@/redux/hooks';
import { getMe } from '@/services/AuthService';
import { ICartAddress } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FaCity, FaRoad } from 'react-icons/fa';
import addressSchema from './AddressValidationSchema';
import { updateAddress } from '@/redux/features/cartSlice';
import { MdEmail } from 'react-icons/md';
import { User } from 'lucide-react';

export default function Address() {
  const [address, setAddress] = useState<ICartAddress | null>(null);
  const [useLoggedAddress, setUseLoggedAddress] = useState<boolean>(false);

  useEffect(() => {
    const myAddress = async () => {
      const { data } = await getMe();

      setAddress({
        ...data?.address,
        name: data?.name?.firstName,
        email: data?.email,
      });
    };
    myAddress();
  }, []);

  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: {
        street: address?.street ?? '',
        city: address?.city ?? '',
        name: address?.name ?? '',
        email: address?.email ?? '',
      },
    },
  });

  // Handle radio button change
  const handleAddressTypeChange = (value: string) => {
    setUseLoggedAddress(value === 'logged');

    if (value === 'logged' && address) {
      form.reset({
        address: {
          street: address.street || '',
          city: address.city || '',
          name: address.name || '',
          email: address.email || '',
        },
      });

      form.handleSubmit(onSubmit)();
    } else {
      form.reset({
        address: {
          street: '',
          city: '',
          name: '',
          email: '',
        },
      });
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    dispatch(
      updateAddress({
        street: data?.address?.street,
        city: data?.address?.city,
        name: data?.address?.name,
        email: data?.address?.email,
      })
    );
  };

  return (
    <div className="bg-white rounded-sm col-span-12 sm:col-span-6 lg:col-span-4  p-5 ">
      <div className="flex flex-col justify-between h-full">
        <h1 className="text-2xl font-bold">Address</h1>
        <p className="text-gray-500">Enter your address</p>
        <div className="mt-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Radio Button for Address Type */}
              <RadioGroup
                value={useLoggedAddress ? 'logged' : 'new'}
                onValueChange={handleAddressTypeChange}
                className="flex"
              >
                <FormItem className="flex items-center space-x-1">
                  <FormControl>
                    <RadioGroupItem value="logged" />
                  </FormControl>
                  <FormLabel>Use Logged Address</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-1">
                  <FormControl>
                    <RadioGroupItem value="new" />
                  </FormControl>
                  <FormLabel>Enter New Address</FormLabel>
                </FormItem>
              </RadioGroup>

              {/* City Select */}
              <FormField
                control={form.control}
                name="address.name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      <User />
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <MdEmail />
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      <FaCity className="inline-block mr-2" />
                      City
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="min-w-[220px] cursor-pointer">
                          <SelectValue placeholder="Select a city" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cities.map((el, id) => (
                          <SelectItem
                            className="cursor-pointer"
                            key={id}
                            value={el}
                          >
                            {`${el.slice(0, 1).toUpperCase()}${el.slice(1)}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Street Input */}
              <FormField
                control={form.control}
                name="address.street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <FaRoad className="inline-block mr-2" />
                      Street
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Conditionally render submit button */}
              {!useLoggedAddress && (
                <div className="mt-4">
                  <Button className="w-full" type="submit">
                    Save Address
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
