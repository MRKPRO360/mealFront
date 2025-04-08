'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CalendarDays, Edit, Star, Trash } from 'lucide-react';
import { useState } from 'react';
import { IReview } from '@/types';
import { useUser } from '@/context/UserContext';
import { FTContentModal } from '@/components/ui/core/FTContentModal';
import ReviewBox from '@/components/ui/core/Review';
import { FTModal } from '@/components/ui/core/FTModal';
import { deleteMyReview, updateMyReview } from '@/services/ReviewService';
import { toast } from 'sonner';
import { revalidateRecipes } from '@/services/RecipeService';

export default function ReviewList({ reviews }: { reviews: IReview[] }) {
  const [visibleCount, setVisibleCount] = useState(3);

  const { user } = useUser();

  const myReview = reviews.find((review) => review.userId._id === user?.id);
  const userReview = reviews.filter((review) => review.userId._id !== user?.id);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visibleReviews = userReview.slice(0, visibleCount);

  const handleDelete = async () => {
    try {
      // await your API call here...
      if (!myReview?._id) return toast("The review id doesn't exist");
      const result = await deleteMyReview(myReview?._id);

      if (result.success) {
        setLoading(false);

        toast.success(result.message || 'Review deleted successfully!');

        revalidateRecipes();
      } else {
        setLoading(false);
        toast.error('Something went very wrong!');
      }
      close();
    } catch (err: any) {
      setLoading(false);

      console.log(err);
      toast.error(err.message || 'Something went very wrong!');
    } finally {
      setLoading(false);
    }
  };

  const [loading, setLoading] = useState(false);

  const onSubmit = async (payload: Partial<IReview>, close: () => void) => {
    setLoading(true);
    try {
      // await your API call here...
      if (!myReview?._id) return toast("The review id doesn't exist");
      const result = await updateMyReview(myReview?._id, {
        rating: payload.rating,
        comment: payload.comment,
      });

      if (result.success) {
        setLoading(false);

        toast.success(result.message || 'Review updated successfully!');

        revalidateRecipes();
      } else {
        setLoading(false);
        toast.error('Something went very wrong!');
      }
      close();
    } catch (err: any) {
      setLoading(false);

      console.log(err);
      toast.error(err.message || 'Something went very wrong!');
    } finally {
      setLoading(false);
    }
  };

  if (!reviews.length) return;
  return (
    <div className="max-w-6xl rounded-xs mx-auto mt-12 lg:mt-0 pb-10">
      <div className="bg-white p-6">
        <div className="space-y-4">
          {myReview && (
            <div className="mb-8">
              <h2 className="text-xl mb-4 font-semibold">My Review</h2>
              <Card className="not-last-child-border">
                <CardContent className="sm:px-0 flex items-start gap-4 ">
                  <Avatar>
                    <AvatarImage src={myReview.userId.customer.profileImg} />
                  </Avatar>
                  <div className="space-y-1">
                    <p className="font-medium">
                      {myReview.userId.name.firstName}{' '}
                      {myReview.userId.name.lastName}
                    </p>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star size={16} fill="currentColor" />
                      <span className="text-sm">
                        {myReview.rating.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {myReview.comment}
                    </p>
                    <p className="text-xs text-gray-500">
                      Reviewed on{' '}
                      {new Date(myReview.createdAt).toLocaleDateString()}
                    </p>
                    {/* Add logic to edit */}
                    <div className="flex">
                      <FTContentModal
                        title="Edit your review"
                        description="Update your feedback"
                        hideFooter
                        icon={<Edit />}
                        btnSize="sm"
                        btnVariant="ghost"
                        btnColor="green-700"
                      >
                        {(close) => (
                          <ReviewBox
                            prevComment={myReview.comment}
                            prevRating={myReview.rating}
                            loading={loading}
                            onSubmit={(payload) => onSubmit(payload, close)}
                          />
                        )}
                      </FTContentModal>

                      <FTModal
                        title="Delete Review?"
                        description="This action cannot be undone. This will permanently delete your review :("
                        onConfirm={() => handleDelete()}
                      >
                        <Button
                          className="rounded-xs"
                          size="sm"
                          variant="ghost"
                        >
                          <Trash className="text-red-700" />
                        </Button>
                      </FTModal>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {
            <div>
              <h2 className="text-xl mb-4 font-semibold">All Reviews</h2>
              <div className="space-y-4">
                {visibleReviews?.map((review) => (
                  <Card key={review._id} className="not-last-child-border">
                    <CardContent className="sm:px-0 flex items-start gap-4 ">
                      <Avatar>
                        <AvatarImage src={review.userId.customer.profileImg} />
                      </Avatar>
                      <div className="space-y-1">
                        <p className="font-medium">
                          {review.userId.name.firstName}{' '}
                          {review.userId.name.lastName}
                        </p>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star size={16} fill="currentColor" />
                          <span className="text-sm">
                            {review.rating.toFixed(1)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {review.comment}
                        </p>
                        <p className="text-xs pb-1 text-gray-500">
                          Reviewed on{' '}
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          }

          {visibleReviews.length > visibleCount && (
            <div className="text-center">
              <Button size="sm" onClick={handleShowMore}>
                Show More
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
