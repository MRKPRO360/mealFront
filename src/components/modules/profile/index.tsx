import { IUser } from '@/types';
import Image from 'next/image';

import {
  Mail,
  Phone,
  MapPin,
  User,
  Leaf,
  Signpost,
  PenIcon,
  ChefHat,
} from 'lucide-react';
import Link from 'next/link';

function MyProfile({ user }: { user: IUser }) {
  return (
    <div className="p-6 bg-sidebar rounded-xs">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-40 h-40 relative">
          <Image
            src={
              user?.profileImg ||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvlBlOJM_kUzWczQDxlorQPpsSaXqwNGqY5gcwDVHzt1saBEBiIbEIRhjC-xdKbZsg2Zw&usqp=CAU'
            }
            alt="Profile"
            className="absolute rounded-full object-cover border-4 border-amber-100"
            fill={true}
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <User className="w-6 h-6 text-blue-500" /> {user?.name?.firstName}{' '}
            {user?.name?.lastName}
          </h1>
          <p className="text-gray-600 capitalize">{user?.user?.role}</p>
          <span className="inline-block px-3 py-1 my-2 text-sm font-medium text-white bg-yellow-500 rounded-full">
            {user?.user?.status}
          </span>

          <Link
            className="flex items-center gap-2  font-semibold"
            href="/update-profile"
          >
            <PenIcon className="w-5 h-5 text-green-700" />
            <span className="text-gray-700">Edit Profile</span>
          </Link>
        </div>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-white shadow-xs rounded-xs">
          <h2 className="text-xl font-semibold mb-3">Contact Info</h2>
          <p className="flex items-center gap-2 text-gray-700">
            <Mail className="w-5 h-5 text-gray-600" /> {user?.email}
          </p>
          <p className="flex items-center gap-2 text-gray-700 mt-2">
            <Phone className="w-5 h-5 text-gray-600" /> {user?.phoneNumber}
          </p>
        </div>
        <div className="p-4 bg-white shadow-xs rounded-xs">
          <h2 className="text-xl font-semibold mb-3">Address</h2>
          <p className="flex items-center gap-2 text-gray-700">
            <MapPin className="w-5 h-5 text-gray-600" />
            {user?.address?.district?.slice(0, 1).toUpperCase()}
            {user?.address?.district?.slice(1)} ,{' '}
            {user?.address?.city?.slice(0, 1).toUpperCase()}
            {user?.address?.city?.slice(1)}
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <Signpost className="w-5 h-5 text-gray-600" />
            {user?.address?.street?.slice(0, 1)?.toUpperCase()}
            {user?.address?.street?.slice(1)}
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-white shadow-xs rounded-xs">
        {user?.user?.role === 'customer' && (
          <>
            <h2 className="text-xl font-semibold mb-3">Dietary Preferences</h2>
            <p className="flex items-center gap-2 text-gray-700">
              <Leaf className="w-5 h-5 text-gray-600" />{' '}
              {user?.dietaryPreferences?.join(', ')}
            </p>
          </>
        )}
        {user?.user?.role === 'provider' && (
          <>
            <h2 className="text-xl font-semibold mb-3">Cuisine Secialities</h2>
            <p className="flex items-center gap-2 text-gray-700">
              <ChefHat className="w-5 h-5 text-gray-600" />{' '}
              {user?.cuisineSpecialties?.join(', ')}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default MyProfile;
