import UpdateProfileForm from '@/components/modules/profile/updateProfile/UpdateProfileForm';
import { getMe } from '@/services/AuthService';

async function UpdateProfile() {
  const { data } = await getMe();

  console.log(data);

  return (
    <div>
      <UpdateProfileForm userData={data} />
    </div>
  );
}

export default UpdateProfile;
