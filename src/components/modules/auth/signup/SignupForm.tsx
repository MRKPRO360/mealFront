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

function SignupForm() {
  const { setIsLoading } = useUser();

  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(signupSchema),
  });

  const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;

  const password = form.watch('password');
  const confirmPassword = form.watch('confirmPassword');

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(isSubmitting);
    console.log('ok');

    console.log(form.formState.errors);

    if (!selectedRole || selectedRole === '')
      return toast.error('Select a role!');

    if (data.role === 'customer') {
      try {
        const customerFormData = new FormData();

        customerFormData.append('data', JSON.stringify(data));

        customerFormData.append('file', data.profileImg);

        const res = await signupCustomer(customerFormData);
        console.log(res);

        // setIsLoading(true);
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
    } else if (data.role === 'provider') {
      try {
        const providerFormData = new FormData();

        providerFormData.append('data', JSON.stringify(userData));

        providerFormData.append('file', data.profileImg);

        const res = await signupProvider(providerFormData);
        // setIsLoading(true);
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
      className="sm:max-w-[480px] mx-auto bg-white/80 py-8 px-2 border mt-14 mb-4"
    >
      <h1 className="text-center text-xl md:text-2xl text-thin mb-8">Signup</h1>
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
                  <Input type="password" {...field} value={field.value || ''} />
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
                  <Input type="password" {...field} value={field.value || ''} />
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
                <FormField
                  control={form.control}
                  name="profileImg"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Profile Picture</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Dhanikunda, Parshuram"
                          type="file"
                          {...field}
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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

          <Button type="submit" className="mt-3 w-full">
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
        <ButtonWithIcon
          icon={<IoLogoGoogle className="text-xl" />}
          text="Google"
          variant="black"
        />
        <ButtonWithIcon
          icon={<IoLogoGithub className="text-xl" />}
          text="Github"
          variant="blue"
        />
      </div>
      <div className="text-center mt-4">
        Already have an account?{' '}
        <Link href="/login" className="text-green-800 underline">
          Login
        </Link>
      </div>
    </div>
  );
}

export default SignupForm;
