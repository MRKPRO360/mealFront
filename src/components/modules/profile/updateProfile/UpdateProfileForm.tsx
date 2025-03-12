'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { FaCity, FaRoad, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'sonner';
import { IUser } from '@/types';
import profileSchema from './updateProfileValidation';
import ImagePreviewer from '@/components/ui/core/FTImageUploader/ImagePreviewer';
import FTImageUploader from '@/components/ui/core/FTImageUploader';
import { useUser } from '@/context/UserContext';
import { useState } from 'react';
import MultipleSelector, {
  Option,
} from '@/components/ui/core/MulitpleSelector';
import { updateCustomer, updateProvider } from '@/services/AuthService';
import { useRouter } from 'next/navigation';
import { dietaryPreferences } from '@/constants/preference';

const OPTIONS: Option[] = dietaryPreferences.map((item) => ({
  label: item,
  value: item,
}));

export default function UpdateProfileForm({ userData }: { userData: IUser }) {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: userData.name.firstName || '',
      lastName: userData.name.lastName || '',
      email: userData.email || '',
      phoneNumber: userData.phoneNumber || '',
      street: userData?.address!.street || '',
      city: userData?.address!.city || '',
      district: userData?.address!.district || '',
      zipCode: userData?.address!.zipCode || '',
      dietaryPreferences: (userData.dietaryPreferences || []) as Array<
        (typeof dietaryPreferences)[number]
      >,
    },
  });

  const { setIsLoading } = useUser();
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([
    userData?.profileImg as string,
  ]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!userData.user) return toast.error('No user found!');

    if (userData.user.role === 'customer') {
      try {
        const customerFormData = new FormData();

        customerFormData.append(
          'data',
          JSON.stringify({ _id: userData._id, ...data })
        );

        if (imageFiles.length > 0) {
          customerFormData.append('file', imageFiles[0] as File);
        }

        const res = await updateCustomer(customerFormData);

        if (res?.success) {
          toast.success(res?.message);
          router.push('/profile');
          setIsLoading(true);
        } else {
          toast.error(res?.message);
        }
      } catch (err: any) {
        console.error(err);
      }
    } else if (userData.user.role === 'provider') {
      try {
        const providerFormData = new FormData();

        providerFormData.append('data', JSON.stringify(data));

        if (imageFiles.length > 0) {
          providerFormData.append('file', imageFiles[0] as File);
        }

        const res = await updateProvider(providerFormData);
        setIsLoading(true);
        if (res?.success) {
          toast.success(res?.message);
          router.push('/profile');
        } else {
          toast.error(res?.message);
        }
      } catch (err: any) {
        console.error(err);
      }
    } else return;
  };

  return (
    <div
      style={{
        width: 'calc(100% - 20px)',
      }}
      className="sm:max-w-[480px] mx-auto bg-white/80 py-8 px-2 border mt-14 mb-4"
    >
      <h1 className="text-center text-xl md:text-2xl text-thin mb-8">
        Update Profile
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="street"
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

          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    <FaCity className="inline-block mr-2" />
                    City
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
              name="district"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    <FaMapMarkerAlt className="inline-block mr-2" />
                    District
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="dietaryPreferences"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dieteray Preference</FormLabel>
                <FormControl>
                  <MultipleSelector
                    {...field}
                    value={field.value.map((val) => ({
                      value: val,
                      label: val,
                    }))} // ✅ Convert strings to Option objects
                    defaultOptions={OPTIONS}
                    placeholder="Select your preference"
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                    onChange={
                      (selectedOptions) =>
                        field.onChange(
                          selectedOptions.map((opt) => {
                            return opt.value;
                          })
                        ) // ✅ Convert back to string[] for form state
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {imagePreview.length > 0 ? (
            <ImagePreviewer
              setImageFiles={setImageFiles}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
              className="mt-8"
            />
          ) : (
            <div className="mt-8">
              <FTImageUploader
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
                label="Upload Profile Picture"
              />
            </div>
          )}

          <Button type="submit" className="w-full">
            Update Profile
          </Button>
        </form>
      </Form>
    </div>
  );
}
