import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';
import { cookies } from 'next/headers';

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // CredentialsProvider({
    //   // The name to display on the sign in form (e.g. "Sign in with...")
    //   name: 'Credentials',

    //   credentials: {
    //     email: {
    //       label: 'Email',
    //       type: 'email',
    //       placeholder: 'example@gmail.com',
    //     },
    //     password: { label: 'Password', type: 'password' },
    //   },
    //   async authorize(credentials, req) {
    //     // Add logic here to look up the user from the credentials supplied

    //     const res = await fetch(
    //       `${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,
    //       {
    //         method: 'POST',
    //         body: JSON.stringify(credentials),
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //       }
    //     );

    //     const result = await res.json();
    //     console.log(result.user);

    //     if (res?.ok && result?.user) {
    //       // Any object returned will be saved in `user` property of the JWT
    //       return result?.user;
    //     } else {
    //       // If you return null then an error will be displayed advising the user to check their details.
    //       return null;

    //       // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
    //     }
    //   },
    // }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Only run for social logins
      if (account?.provider !== 'credentials') {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/users/social-login`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: user.email,
                name: {
                  firstName: user?.name?.split(' ')[0] || 'Social',
                  lastName: user?.name?.split(' ')[1] || 'User',
                },

                method: account?.provider,
                profileImg: user.image,
              }),
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            console.error('Social login failed:', errorData);
            return false;
          }

          // Optionally store the returned user data
          const result = await response.json();
          console.log(result);

          if (result.success) {
            (await cookies()).set('accessToken', result.data.accessToken);
            (await cookies()).set('refreshToken', result?.data?.refreshToken);
          }

          // Make sure this matches your backend response
          return true;
        } catch (error) {
          console.error('Failed to create social login user', error);
          return false;
        }
      }
      return true;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};
