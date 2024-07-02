'use client';

import { ClerkProvider, ClerkLoaded, SignIn } from '@clerk/nextjs';
import { PropsWithChildren, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import UserUpdater from './UserUpdater';
import { useAppearance } from './useAppearance';
import { authEnv } from '@/config/auth';

const Clerk = memo(({ children }: PropsWithChildren) => {
  const appearance = useAppearance();
  const {
    i18n: { language, getResourceBundle },
  } = useTranslation('clerk');

  const localization = useMemo(() => getResourceBundle(language, 'clerk'), [language]);
  const isSignUpDisabled = authEnv.NEXT_PUBLIC_DISABLE_CLERK_SIGN_UP;

  return (
    <ClerkProvider appearance={appearance} localization={localization}>
      {children}
      {isSignUpDisabled ? (
        <ClerkLoaded>
          <SignIn
            appearance={{
              elements: {
                footerAction: { display: "none" },
              },
            }}
            path="/sign-in"
          />
        </ClerkLoaded>
      ) : (
        <UserUpdater />
      )}
    </ClerkProvider>
  );
});

export default Clerk;