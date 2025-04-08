'use client';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import StarRating from './StarRating';
import { IReview } from '@/types';

const ReviewBox = ({
  loading,
  onSubmit,
  prevRating = 0,
  prevComment = '',
}: {
  onSubmit: (data: Partial<IReview>) => void;
  loading: boolean;
  prevRating?: number;
  prevComment?: string;
}) => {
  const [rating, setRating] = useState(prevRating);
  const [comment, setComment] = useState(prevComment);

  const handleSubmit = () => {
    if (rating && comment) {
      onSubmit({ rating, comment });
    }
  };

  return (
    <div className=" space-y-4">
      <h3 className="text-lg font-semibold">Leave a Review</h3>

      <StarRating value={rating} onChange={setRating} />

      <p>Rating: {rating}/5</p>

      <Textarea
        className="h-auto sm:h-auto md:h-auto"
        placeholder="Write your thoughts..."
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <Button
        size="sm"
        onClick={handleSubmit}
        disabled={!rating || !comment || loading}
      >
        Submit
      </Button>
    </div>
  );
};

export default ReviewBox;
