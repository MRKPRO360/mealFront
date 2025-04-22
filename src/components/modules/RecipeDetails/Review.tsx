'use client';

import ReviewBox from '@/components/ui/core/Review';
import { useUser } from '@/context/UserContext';
import { revalidateRecipes } from '@/services/RecipeService';
import { createMyReview, getReviewElegibility } from '@/services/ReviewService';
import { IReview } from '@/types';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

function Review({
  reviews,
  targetType = 'recipe',
}: {
  reviews: IReview[];
  targetType?: 'recipe' | 'provider';
}) {
  const { user } = useUser();
  console.log(user);

  const [loading, setLoading] = useState(false);
  const { recipeId, providerId } = useParams();

  const myReview = reviews.find((review) => review.userId._id === user?.id);

  const onSubmit = async (payload: Partial<IReview>) => {
    if (!user) return toast.error('Please login to give a review!');

    try {
      setLoading(true);
      const { data } = await getReviewElegibility({
        targetId: (recipeId as string) || (providerId as string),
        targetType: targetType,
      });

      if (!data.eligibleToReview) {
        setLoading(false);
        return toast.error('You must purchase before reviewing!');
      } else if (data.alreadyReviewed) {
        setLoading(false);

        toast.error("You've already gave a review!");
      } else {
        try {
          const result = await createMyReview({
            targetId: (recipeId as string) || (providerId as string),
            targetType: targetType,
            rating: Number(payload.rating),
            comment: payload.comment as string,
          });

          if (result.success) {
            setLoading(false);

            toast.success(result.message || 'Review submitted successfully');

            revalidateRecipes();
          } else {
            setLoading(false);
            toast.error('Something went very wrong!');
          }
        } catch (err: any) {
          setLoading(false);

          console.log(err);
          toast.error(err.message || 'Something went very wrong!');
        }
      }
    } catch (err) {
      setLoading(false);

      console.log(err);
    }
  };

  if (myReview || user?.role === 'provider') return;
  return (
    <div className="max-w-6xl rounded-xs mx-auto py-12 lg:mt-0">
      <div className={`bg-white ${targetType === 'recipe' && 'p-6'}`}>
        <ReviewBox loading={loading} onSubmit={onSubmit} />
      </div>
    </div>
  );
}

export default Review;
