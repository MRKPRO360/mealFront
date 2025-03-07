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
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { loginSchema } from './LoginValidation';
import { loginUser } from '@/services/AuthService';

function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirectPath');
  const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);

      if (res.success) {
        toast.success('Logged in successfully!');
        router.push(redirect || '/');
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
      className="sm:max-w-[480px] mx-auto bg-white/80 py-8 px-2 border mt-14 mb-4"
    >
      <h1 className="text-center text-xl md:text-2xl text-thin mb-8">Log in</h1>
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
              name="signedIn"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="w-5 h-5 data-[state=checked]:before:scale-125 data-[state=checked]:bg-green-700 data-[state=checked]:before:bg-white"
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
        <Link href="/signup" className="text-green-800 underline">
          Signup
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
