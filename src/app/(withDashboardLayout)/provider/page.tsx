import MyProfile from '@/components/modules/profile';
import { getMe } from '@/services/AuthService';

async function ProviderHomePage() {
  const { data } = await getMe();

  return <MyProfile user={data} />;
}

export default ProviderHomePage;
