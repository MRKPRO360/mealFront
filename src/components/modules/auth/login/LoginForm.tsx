'use client';

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

import { toast } from 'sonner';

function LoginForm() {
  const form = useForm();

  //   const searchParams = useSearchParams();
  //   const redirect = searchParams.get('redirectPath');
  //   const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    // toast.success(res.)
  };

  return (
    <div className="max-w-[480px] mx-auto bg-white/20 py-8 px-2 border mt-14">
      <h1 className="text-center text-2xl text-thin">Log in</h1>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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

          {/* Checkbox */}
          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Keep me signed in</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <Link className="text-green-800 underline" href="/forgotPassword">
              Forgot Password
            </Link>
          </div>

          <Button type="submit" className="mt-3 w-full">
            {isSubmitting ? 'Logging....' : 'Login'}
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
        Don&apos;t have an account?{' '}
        <Link href="signup" className="text-green-800 underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
