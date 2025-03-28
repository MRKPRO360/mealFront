'use client';
import UserProvider from '@/context/UserContext';
import StoreProvider from './StoreProvider';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <StoreProvider>{children}</StoreProvider>
    </UserProvider>
  );
}

export default Providers;
