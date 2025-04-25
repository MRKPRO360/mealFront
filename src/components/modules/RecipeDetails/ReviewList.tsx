'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Edit, Star, Trash } from 'lucide-react';
import { useState } from 'react';
import { IReview } from '@/types';
import { useUser } from '@/context/UserContext';
import { FTContentModal } from '@/components/ui/core/FTContentModal';
import ReviewBox from '@/components/ui/core/Review';
import { FTModal } from '@/components/ui/core/FTModal';
import { deleteMyReview, updateMyReview } from '@/services/ReviewService';
import { toast } from 'sonner';
import { revalidateRecipes } from '@/services/RecipeService';

export default function ReviewList({
  reviews,
  providerReview = false,
}: {
  reviews: IReview[];
  providerReview?: boolean;
}) {
  const [visibleCount, setVisibleCount] = useState(3);

  const { user } = useUser();

  const myReview = reviews.find((review) => review.userId._id === user?.id);
  const userReview = reviews.filter((review) => review.userId._id !== user?.id);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visibleReviews = userReview.slice(0, visibleCount);

  const handleDelete = async (): Promise<void> => {
    try {
      if (!myReview?._id) {
        toast("The review id doesn't exist");
        return;
      }
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
      if (!myReview?._id) {
        toast("The review id doesn't exist");
        return;
      }
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
    <div
      className={`max-w-6xl rounded-xs mx-auto ${
        !providerReview ? 'mt-12 pb-10' : 'mt-1'
      } lg:mt-0`}
    >
      <div className={`bg-white ${!providerReview && 'p-6'}`}>
        <div className="space-y-4">
          {myReview && (
            <div className={` ${!providerReview && 'mb-8'}`}>
              <h2 className="text-xl mb-4 font-semibold">My Review</h2>
              <Card key={myReview._id}>
                <CardContent className="sm:px-0 flex items-start gap-4 ">
                  <Avatar>
                    <AvatarImage src={myReview.userId.customer.profileImg} />
                  </Avatar>
                  {/* <div className="space-y-1">
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
                      </div> */}

                  <div className="space-y-3  p-4 bg-gray-50 rounded-xs shadow-sm border border-gray-50 w-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {myReview.userId.name.firstName}{' '}
                          <span className="font-semibold">
                            {myReview.userId.name.lastName}
                          </span>
                        </h4>
                        <div className="flex items-center gap-1.5 mt-1">
                          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full">
                            <Star
                              size={16}
                              className="text-amber-500 fill-amber-400"
                            />
                            <span className="text-sm font-medium text-amber-800">
                              {myReview.rating.toFixed(1)}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(myReview.createdAt).toLocaleDateString(
                              'en-US',
                              {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed">
                      {myReview.comment}
                    </p>
                    <div className="flex border-t border-gray-100">
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

              {/* <Card>
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
              </Card> */}
            </div>
          )}

          {visibleReviews.length > 0 && (
            <div>
              <h2 className="text-xl mb-4 font-semibold">All Reviews</h2>
              <div className="space-y-4">
                {visibleReviews?.map((review) => (
                  <Card key={review._id}>
                    <CardContent className="sm:px-0 flex items-start gap-4 ">
                      <Avatar>
                        <AvatarImage src={review.userId.customer.profileImg} />
                      </Avatar>
                      {/* <div className="space-y-1">
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
                      </div> */}

                      <div className="space-y-3  p-4 bg-gray-50 rounded-xs shadow-sm border border-gray-50 w-full">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {review.userId.name.firstName}{' '}
                              <span className="font-semibold">
                                {review.userId.name.lastName}
                              </span>
                            </h4>
                            <div className="flex items-center gap-1.5 mt-1">
                              <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full">
                                <Star
                                  size={16}
                                  className="text-amber-500 fill-amber-400"
                                />
                                <span className="text-sm font-medium text-amber-800">
                                  {review.rating.toFixed(1)}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500">
                                {new Date(review.createdAt).toLocaleDateString(
                                  'en-US',
                                  {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                  }
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-700 leading-relaxed">
                          {review.comment}
                        </p>

                        <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                          <button className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors">
                            Helpful?
                          </button>
                          <button className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors">
                            Report
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

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
