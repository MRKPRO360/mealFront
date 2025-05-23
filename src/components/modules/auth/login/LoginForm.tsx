'use client';
// import { signIn } from 'next-auth/react';
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
import { useUser } from '@/context/UserContext';
import { useSocialLogin } from '@/hooks/useSocialLogin';

function LoginForm() {
  const { setIsLoading } = useUser();

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
        setIsLoading(true);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message || 'Something went wrong!');
    }
  };

  const { handleSocialLogin, isLoading } = useSocialLogin();

  const handleBack = () => {
    router.back();
  };

  return (
    <div
      style={{
        width: 'calc(100% - 20px)',
      }}
      className="sm:max-w-[480px] mx-auto pt-10 mb-4"
    >
      <div className="border bg-white/80 px-2 py-8">
        <h1 className="text-center text-xl sm:text-2xl font-semibold mb-8">
          Log in
        </h1>
        <Form {...form}>
          <div className="space-y-2">
            <FormLabel> Choose one of account</FormLabel>
            <div className="flex gap-3 mb-4">
              <Button
                type="button"
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition-all duration-200 rounded-xs"
                onClick={async () => {
                  form.setValue('email', 'jamesarthur@gmail.com');
                  form.setValue('password', 'provider12345');
                  await new Promise((res) => setTimeout(res, 100)); // allow form to update
                  form.handleSubmit(onSubmit)(); // trigger login
                }}
              >
                Provider
              </Button>

              <Button
                type="button"
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-all duration-200 rounded-xs"
                onClick={async () => {
                  form.setValue('email', 'nill@jane.com');
                  form.setValue('password', 'customer12345');
                  await new Promise((res) => setTimeout(res, 100));
                  form.handleSubmit(onSubmit)();
                }}
              >
                Customer
              </Button>

              <Button
                type="button"
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md transition-all duration-200 rounded-xs"
                onClick={async () => {
                  form.setValue('email', 'johndoe@example.com');
                  form.setValue('password', 'admin12345');
                  await new Promise((res) => setTimeout(res, 100));
                  form.handleSubmit(onSubmit)();
                }}
              >
                Admin
              </Button>
            </div>
          </div>

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

            <Button
              disabled={isSubmitting}
              type="submit"
              className="mt-3 w-full"
            >
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
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="text-green-800 underline font-semibold"
          >
            Signup
          </Link>
          <br /> or{' '}
          <span
            onClick={() => handleBack()}
            className="cursor-pointer text-green-800 underline font-semibold"
          >
            Go back
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
