import { Star } from 'lucide-react';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const StarRating = ({
  value,
  onChange,
  precision = 0.1,
}: {
  value: number;
  onChange: (val: number) => void;
  precision?: number;
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const stars = Array.from({ length: 5 }, (_, i) => {
    const current = i + 1;
    return (
      <span
        key={i}
        className="cursor-pointer"
        onMouseEnter={() => setHoverValue(current)}
        onMouseLeave={() => setHoverValue(null)}
        onClick={() => onChange(current)}
      >
        <Star
          className={`w-6 h-6 ${
            (hoverValue ?? value) >= current
              ? 'fill-yellow-400 stroke-yellow-500'
              : 'stroke-gray-300'
          }`}
        />
      </span>
    );
  });

  return <div className="flex items-center gap-1">{stars}</div>;
};

export default StarRating;
