import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { TruncatedText } from '@/components/ui/core/FTTruncateText';
import { IUser } from '@/types';
import { MapPin, Star, Utensils } from 'lucide-react';
import Link from 'next/link';

function ProviderInfo({ provider }: { provider: IUser }) {
  return (
    <div className="mt-4">
      <h3 className="font-bold ">About the Chef</h3>

      <div className="flex items-start gap-4 mt-3">
        <Avatar className="h-10 w-10 border-2 border-white shadow-md">
          <AvatarImage src={provider?.profileImg} />
          <AvatarFallback>
            {provider?.name?.firstName?.charAt(0)}
            {provider?.name?.lastName?.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h4>
                {provider?.name?.firstName} {provider?.name?.lastName}
              </h4>
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className=" text-gray-600 text-sm">
                  {provider?.rating} ({provider?.ratingsCount} reviews)
                </span>
              </div>
            </div>

            <Link href={`/customer/all-providers/${provider?._id}`}>
              <Button variant="outline" size="sm">
                View Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-3 text-md">
        <div className="flex items-center gap-2">
          <Utensils className="h-4 w-4" />
          <span>
            Specializes in: {provider?.cuisineSpecialties?.join(', ')}
          </span>
        </div>
        <div className="flex items-center gap-2  ">
          <MapPin className="h-4 w-4" />
          <span>Based in: {provider?.address?.city}</span>
        </div>
        {provider?.bio && (
          <TruncatedText
            className="text-gray-600 text-sm mt-2"
            text={provider.bio}
            maxLength={60}
          />
        )}
      </div>
    </div>
  );
}

export default ProviderInfo;
