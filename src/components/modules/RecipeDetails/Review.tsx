'use client';

import ReviewBox from '@/components/ui/core/Review';
import { useUser } from '@/context/UserContext';
import { revalidateRecipes } from '@/services/RecipeService';
import { createMyReview, getReviewElegibility } from '@/services/ReviewService';
import { IReview } from '@/types';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

function Review({ reviews }: { reviews: IReview[] }) {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const { recipeId } = useParams();

  const myReview = reviews.find((review) => review.userId._id === user?.id);

  const onSubmit = async (payload: Partial<IReview>) => {
    if (!user) return toast.error('Please login to give a review!');

    try {
      setLoading(true);
      const { data } = await getReviewElegibility({
        targetId: recipeId as string,
        targetType: 'recipe',
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
            targetId: recipeId as string,
            targetType: 'recipe',
            rating: Number(payload.rating),
            comment: payload.comment as string,
          });

          console.log(result);

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

  if (myReview) return;
  return (
    <div className="max-w-6xl rounded-xs mx-auto mt-12 lg:mt-0 pb-10">
      <div className="bg-white p-6">
        <ReviewBox loading={loading} onSubmit={onSubmit} />
      </div>
    </div>
  );
}

export default Review;
