import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useState } from 'react';

const StarRating = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const showHalfStar = !hoverValue && value > star - 1 && value < star;

        const isFilled = (hoverValue || value) >= star;

        return (
          <button
            key={star}
            type="button"
            className="text-2xl focus:outline-none relative"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHoverValue(star)}
            onMouseLeave={() => setHoverValue(null)}
          >
            {showHalfStar ? (
              <FaStarHalfAlt className="text-yellow-400" />
            ) : isFilled ? (
              <FaStar className="text-yellow-400" />
            ) : (
              <FaRegStar className="text-gray-300" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
