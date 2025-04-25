'use client';

import { IoLogoGoogle } from 'react-icons/io5';
import { IoLogoGithub } from 'react-icons/io5';
import { Button } from '@/components/ui/button';

import { ButtonWithIcon } from '@/components/ui/core/ButtonWithIcon';

import { FiInfo } from 'react-icons/fi';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

import { cn } from '@/lib/utils';
import { FaUserTie, FaShoppingCart } from 'react-icons/fa';

import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { toast } from 'sonner';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { districts } from '@/constants/districts';
import { cities } from '@/constants/cities';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { signupCustomer, signupProvider } from '@/services/AuthService';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from './SignupValidatoin';
import { useUser } from '@/context/UserContext';
import ImagePreviewer from '@/components/ui/core/FTImageUploader/ImagePreviewer';
import FTImageUploader from '@/components/ui/core/FTImageUploader';
import MultipleSelector, {
  Option,
} from '@/components/ui/core/MulitpleSelector';
import { cuisineSpecialties } from '@/constants/cuisineSpecialties';
import { Textarea } from '@/components/ui/textarea';
import { useSocialLogin } from '@/hooks/useSocialLogin';

const roles = [
  {
    id: 'customer',
    label: 'Customer',
    icon: <FaShoppingCart className="text-2xl" />,
  },
  {
    id: 'provider',
    label: 'Provider',
    icon: <FaUserTie className="text-2xl" />,
  },
];

const OPTIONS: Option[] = cuisineSpecialties.map((cuisine) => ({
  label: cuisine,
  value: cuisine,
}));

function SignupForm() {
  const { setIsLoading } = useUser();
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);

  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(signupSchema(selectedRole)),
  });

  const router = useRouter();

  const {
    formState: { isSubmitting, errors },
  } = form;

  console.log(errors);

  const password = form.watch('password');
  const confirmPassword = form.watch('confirmPassword');

  const { handleSocialLogin, isLoading } = useSocialLogin();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!selectedRole || selectedRole === '')
      return toast.error('Select a role!');

    if (selectedRole === 'customer') {
      try {
        const customerFormData = new FormData();

        customerFormData.append('data', JSON.stringify(data));

        customerFormData.append('file', imageFiles[0] as File);

        const res = await signupCustomer(customerFormData);

        setIsLoading(true);
        if (res?.success) {
          toast.success(res?.message);
          router.push('/');
          setIsLoading(true);
        } else {
          toast.error(res?.message);
        }
      } catch (err: any) {
        console.error(err);
      }
    } else if (selectedRole === 'provider') {
      try {
        const providerFormData = new FormData();

        providerFormData.append('data', JSON.stringify(data));

        providerFormData.append('file', imageFiles[0] as File);

        const res = await signupProvider(providerFormData);

        console.log(res);

        setIsLoading(true);
        if (res?.success) {
          toast.success(res?.message);
          router.push('/');
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
      className="sm:max-w-[480px] mx-auto pt-10 mb-8"
    >
      <div className="border bg-white/80 px-2 py-8">
        <h1 className="text-center text-xl md:text-2xl text-thin mb-8">
          Signup
        </h1>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="flex items-center justify-between gap-3">
              <FormField
                control={form.control}
                name="name.firstName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name.lastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} value={field.value || ''} />
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
                    <Input type="email" {...field} value={field.value || ''} />
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
                    <Input type="text" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>

                  {confirmPassword && password !== confirmPassword ? (
                    <FormMessage>Password doesn&apos;t match!</FormMessage>
                  ) : (
                    <FormMessage />
                  )}
                </FormItem>
              )}
            />

            {/* ROLE */}

            <div className="flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-white p-4">
              {/* Title */}
              <h2 className="text:lg md:text-xl font-semibold">
                Please select your role
              </h2>
              <p className="text-gray-500 text-center max-w-md mt-2 text-sm">
                Choose your role to proceed with the registration process.
              </p>

              {/* Role Selection */}
              <div className="flex gap-3 mt-4">
                {roles.map((role) => (
                  <Card
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={cn(
                      'flex flex-col items-center justify-center p-2 border cursor-pointer rounded-xs shadow-xs transition-all',
                      selectedRole === role.id
                        ? 'border-green-700 bg-blue-50'
                        : 'hover:bg-gray-100'
                    )}
                  >
                    <CardContent className="flex flex-col items-center space-y-1">
                      {role.icon}
                      <span className="text-sm">{role.label}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {selectedRole && selectedRole === 'provider' && (
              <>
                <FormField
                  control={form.control}
                  name="cuisineSpecialties"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cuisine Specialties</FormLabel>
                      <FormControl>
                        <MultipleSelector
                          {...field}
                          value={
                            Array.isArray(field.value)
                              ? field?.value?.map((val) => ({
                                  value: val,
                                  label: val,
                                }))
                              : []
                          } // ✅ Convert strings to Option objects
                          defaultOptions={OPTIONS}
                          placeholder="Select cuisine specialties"
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

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={3}
                          className="h-auto sm:h-auto"
                          placeholder="Write a short description..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <div className="flex items-center gap-4 mt-6">
              <Separator className="flex-1" />
              <span className="text-gray-500 text-sm">Personal Info</span>
              <Separator className="flex-1" />
            </div>

            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-base cursor-pointer ">
                  <div className="flex items-center gap-2">
                    <FiInfo size={20} className="text-green-800" />
                    <span className="text-base">
                      Like to share your information with us?
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3">
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

                  <div className="flex items-center justify-between gap-3">
                    <FormField
                      control={form.control}
                      name="address.street"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Street</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Dhanikunda, Parshuram"
                              type="text"
                              {...field}
                              value={field.value || ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address.district"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>District</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="min-w-[220px] cursor-pointer">
                                <SelectValue placeholder="Select a district" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {districts.map((el, id) => (
                                <SelectItem
                                  className="cursor-pointer"
                                  key={id}
                                  value={el}
                                >
                                  {`${el.slice(0, 1).toUpperCase()}${el.slice(
                                    1
                                  )}`}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <FormField
                      control={form.control}
                      name="address.zipCode"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Zip Code</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="exmp: 3940"
                              type="text"
                              {...field}
                              value={field.value || ''}
                            />
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
                          <FormLabel>City</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
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
                                  {`${el.slice(0, 1).toUpperCase()}${el.slice(
                                    1
                                  )}`}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button
              disabled={isSubmitting}
              type="submit"
              className={`mt-3 w-full ${isSubmitting ? 'cursor-pointer' : ''}`}
            >
              {isSubmitting ? 'Signing up....' : 'Signup'}
            </Button>
          </form>
        </Form>

        <div className="flex items-center gap-4 mt-6">
          <Separator className="flex-1" />
          <span className="text-gray-500 text-sm">OR</span>
          <Separator className="flex-1" />
        </div>

        {/* Social login */}
        <div className="mt-3 space-y-3">
          <div onClick={() => handleSocialLogin('google')}>
            <ButtonWithIcon
              disabled={isLoading.google}
              icon={<IoLogoGoogle className="text-xl" />}
              text="Google"
              variant="black"
            />
          </div>
          <div onClick={() => handleSocialLogin('github')}>
            <ButtonWithIcon
              disabled={isLoading.github}
              icon={<IoLogoGithub className="text-xl" />}
              text="Github"
              variant="blue"
            />
          </div>
        </div>
        <div className="text-center mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-green-800 underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
