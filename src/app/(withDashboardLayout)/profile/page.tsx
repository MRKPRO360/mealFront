import MyProfile from '@/components/modules/profile';
import { getMe } from '@/services/AuthService';

const profile = async () => {
  const { data } = await getMe();

  return <MyProfile user={data} />;
};

export default profile;
