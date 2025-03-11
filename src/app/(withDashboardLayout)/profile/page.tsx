import MyProfile from '@/components/modules/profile/MyProfile';
import { getMe, signupCustomer } from '@/services/AuthService';
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';

const profile = async () => {
  // const session = await getServerSession(authOptions);

  // if (session) {
  //   const customerData = {
  //     name: {
  //       firstName: session?.user?.name,
  //     },
  //     email: session?.user?.email,
  //     profileImg: session?.user?.image,
  //   };

  //   const customerFormData = new FormData();
  //   customerFormData.append('data', JSON.stringify(customerData));

  //   const res = await signupCustomer(customerFormData);

  //   console.log(res);
  // }

  // return (
  //   <div>
  //     {session?.user && (
  //       <>
  //         <h1 className="text-4xl text-center mt-10">
  //           Welcome {session?.user?.name}
  //         </h1>
  //         <h1 className="text-4xl text-center mt-10">
  //           Logged-in user email: {session?.user?.email}
  //         </h1>
  //         <Image
  //           src={
  //             session?.user?.image ||
  //             'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
  //           }
  //           width={100}
  //           height={100}
  //           alt="user image"
  //           className="mx-auto rounded-full mt-5"
  //         />
  //       </>
  //     )}
  //   </div>
  // );

  const { data } = await getMe();

  return <MyProfile user={data} />;
};

export default profile;
