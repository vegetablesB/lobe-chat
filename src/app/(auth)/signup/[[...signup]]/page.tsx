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

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    if (authEnv.NEXT_PUBLIC_DISABLE_CLERK_SIGN_UP) {
      router.push('/login');
    }
  }, [router]);

  if (authEnv.NEXT_PUBLIC_DISABLE_CLERK_SIGN_UP) {
    return null;
  }

  return <SignUp path="/signup" />;
};

Page.displayName = 'SignUp';

export default Page;