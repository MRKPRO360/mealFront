import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';

export const useSocialLogin = () => {
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({
    github: false,
    google: false,
  });

  const handleSocialLogin = async (provider: 'github' | 'google') => {
    setIsLoading((prev) => ({ ...prev, [provider]: true }));

    try {
      const result = await signIn(provider, {
        callbackUrl: '/customer', // Relative URL is better
        redirect: false, // Handle redirect manually
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // If successful, you can redirect manually or let the callbackUrl handle it
      if (result?.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? `Failed to login with ${provider}: ${error.message}`
          : `Failed to login with ${provider}`
      );
      console.error(`Social login error (${provider}):`, error);
    } finally {
      setIsLoading((prev) => ({ ...prev, [provider]: false }));
    }
  };

  return { handleSocialLogin, isLoading };
};
