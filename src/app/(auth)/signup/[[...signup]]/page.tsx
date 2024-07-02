import { SignUp } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { authEnv } from '@/config/auth';

import { metadataModule } from '@/server/metadata';
import { translation } from '@/server/translation';

export const generateMetadata = async () => {
  const { t } = await translation('clerk');
  return metadataModule.generate({
    description: t('signUp.start.subtitle'),
    title: t('signUp.start.title'),
    url: '/signup',
  });
};

// Server-side component handling
const Page = () => {
    console.log("authEnv.NEXT_PUBLIC_DISABLE_CLERK_SIGN_UP", authEnv.NEXT_PUBLIC_DISABLE_CLERK_SIGN_UP);
  if (authEnv.NEXT_PUBLIC_DISABLE_CLERK_SIGN_UP) {
    // Redirect to login page if sign-ups are disabled
    redirect('/login');
  }

  return <SignUp path="/signup" />;
};

Page.displayName = 'SignUp';

export default Page;