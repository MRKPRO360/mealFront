'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Flag,
  Home,
  Mail,
  Map,
  MapPin,
  MessageSquare,
  Package,
  Phone,
  Star,
  User,
  Utensils,
} from 'lucide-react';
import { IUser } from '@/types';
import { Badge } from '@/components/ui/badge';
import ReviewList from '@/components/modules/RecipeDetails/ReviewList';
import Review from '@/components/modules/RecipeDetails/Review';

export default function ProviderDetails({ provider }: { provider: IUser }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <Card className="shadow-xs pb-4">
            <CardHeader className="items-center">
              <Avatar className=" w-32 h-32 mb-4  border-2 border-gray-100 shadow-md">
                <AvatarImage src={provider.profileImg} />
                <AvatarFallback>
                  {provider.name.firstName.charAt(0)}
                  {provider.name.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <CardTitle className="text-2xl">
                  {provider.name.firstName} {provider.name.lastName}
                </CardTitle>
                <div className="flex items-center justify-center mt-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="ml-1 font-medium">
                    {provider.rating} ({provider?.ratingsCount} reviews)
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-gray-500" />
                <span>{provider.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-gray-500" />
                <span>{provider.phoneNumber}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-3 text-gray-500" />
                <span>Member since {formatDate(provider.createdAt)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Cuisine Specialties */}
          <Card className="shadow-xs pb-4">
            <CardHeader className="px-1 sm:px-3 pt-4">
              <div className="flex items-center">
                <Utensils className="w-5 h-5 mr-2" />
                <CardTitle>Cuisine Specialties</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {provider?.cuisineSpecialties?.map((cuisine) => (
                  <Badge variant="outline" key={cuisine}>
                    {cuisine}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card className="shadow-xs pb-4">
            <CardHeader className="px-1 sm:px-3 pt-4">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <CardTitle>Address</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Home className="w-5 h-5 mr-3 text-gray-500" />
                  <span>{provider?.address?.street}</span>
                </div>
                <div className="flex items-center">
                  <Map className="w-5 h-5 mr-3 text-gray-500" />
                  <span>
                    {provider?.address?.city}, {provider?.address?.district}
                  </span>
                </div>
                <div className="flex items-center">
                  <Flag className="w-5 h-5 mr-3 text-gray-500" />
                  <span>Zip: {provider?.address?.zipCode}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <Card className="shadow-xs pb-4">
            <CardHeader className="px-1 sm:px-3 pt-4">
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                About
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{provider?.bio}</p>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card className="pb-4 shadow-xs">
            <CardHeader className="px-1 sm:px-3 pt-4">
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                <CardTitle>Customer Reviews</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {provider?.reviews?.length ? (
                //    (
                //     provider?.reviews?.map((review) => (
                //       <div key={review._id} className="border-b pb-4 last:border-0">
                //         <div className="flex items-center justify-between mb-2">
                //           <div className="flex items-center">
                //             <Avatar className="w-10 h-10 mr-3">
                //               <AvatarFallback>
                //                 {review.userId.name.firstName.charAt(0)}
                //                 {review.userId.name.lastName.charAt(0)}
                //               </AvatarFallback>
                //             </Avatar>
                //             <div>
                //               <p className="font-medium">
                //                 {review.userId.name.firstName}{' '}
                //                 {review.userId.name.lastName}
                //               </p>
                //               <p className="text-sm text-gray-500">
                //                 {review.userId.email}
                //               </p>
                //             </div>
                //           </div>
                //           <div className="flex items-center">
                //             <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                //             <span>{review.rating.toFixed(1)}</span>
                //           </div>
                //         </div>
                //         <p className="text-gray-700 mb-2">{review.comment}</p>
                //         <p className="text-sm text-gray-500 flex items-center">
                //           <Clock className="w-4 h-4 mr-1" />
                //           {formatDate(review.createdAt)}
                //         </p>
                //       </div>
                //     ))
                //   )
                <ReviewList providerReview={true} reviews={provider?.reviews} />
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <Package className="w-10 h-10 mx-auto mb-2" />
                  <p>No reviews yet</p>
                </div>
              )}

              <Review targetType="provider" reviews={provider?.reviews} />
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="flex gap-4">
            <Button size="sm">
              <Phone className="w-5 h-5 mr-2" />
              Contact Provider
            </Button>
            <Button size="sm" variant="outline">
              <Mail className="w-5 h-5 mr-2" />
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
