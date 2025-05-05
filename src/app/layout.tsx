import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import Providers from '@/providers/Providers';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-nuinito',
});

export const metadata: Metadata = {
  title: 'Feastify | Healthy Meal Plans & Recipes',
  description:
    'Explore healthy, customizable meal plans and delicious recipes tailored to your dietary needs. Order fresh meals or cook at home with ease!',
  keywords: [
    'meal planning',
    'healthy meals',
    'recipes',
    'meal delivery',
    'custom meals',
    'diet plans',
    'nutrition',
  ],
  authors: [
    { name: 'Md. Rezaul Karim', url: 'https://mdrezaulkarim.vercel.app/' },
  ],
  creator: 'Md. Rezaul Karim',
  icons: {
    icon: '/feastify.ico',
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.className}`}>
      <body>
        <Providers>
          <Toaster richColors position="top-center" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
