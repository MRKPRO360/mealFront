import MyProfile from '@/components/modules/profile/MyProfile';
import { getMe } from '@/services/AuthService';

async function CustomerHomePage() {
  const { data } = await getMe();

  return <MyProfile user={data} />;
}

export default CustomerHomePage;
