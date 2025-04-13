'use client';
import { signIn } from 'next-auth/react';
import { IoLogoGoogle } from 'react-icons/io5';
import { IoLogoGithub } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ButtonWithIcon } from '@/components/ui/core/ButtonWithIcon';
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
import { useRouter, useSearchParams } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { changeUserPassword, loginUser } from '@/services/AuthService';
import { useUser } from '@/context/UserContext';
import { changePasswordSchema } from './ChangePasswordValidation';

function ChangePasswordForm() {
  const { setIsLoading } = useUser();

  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const oldPassword = form.watch('oldPassword');
  const newPassword = form.watch('newPassword');

  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirectPath');
  const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await changeUserPassword(data);
      console.log(res);

      if (res.success) {
        toast.success('Password changed successfully!');
        router.push(redirect || '/');
        setIsLoading(true);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message || 'Something went wrong!');
    }
  };

  return (
    <div
      style={{
        width: 'calc(100% - 20px)',
      }}
      className="sm:max-w-[480px] mx-auto pt-10 mb-4"
    >
      <div className="border bg-white/80 px-2 py-8">
        <h1 className="text-center text-xl md:text-2xl text-thin mb-8">
          Change Password
        </h1>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
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
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  {newPassword && oldPassword === newPassword ? (
                    <FormMessage>Passwords are same!</FormMessage>
                  ) : (
                    <FormMessage />
                  )}
                </FormItem>
              )}
            />

            <Button
              disabled={isSubmitting}
              type="submit"
              className="mt-3 w-full"
            >
              {isSubmitting ? 'Submitting....' : 'Submit'}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          Forgot your password?{' '}
          <Link href="/forgot-password" className="text-green-800 underline">
            Get new password
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordForm;
