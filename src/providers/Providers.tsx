'use client';
import UserProvider from '@/context/UserContext';

function Providers({ children }: { children: React.ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}

export default Providers;
