import Image from 'next/image';
import { IReview } from '@/types';
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im';

interface ReviewCardProps {
  review: IReview;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0 mx-auto md:mx-0 md:px-10">
          <div className="relative w-32 h-32">
            <Image
              src={review.userId.customer.profileImg}
              alt={`${review.userId.name.firstName} ${review.userId.name.lastName}`}
              width={128}
              height={128}
              className="rounded-full object-cover border-4 border-green-100"
              quality={90}
            />
            <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-md">
              <div className="flex items-center justify-center bg-green-500 text-white rounded-full w-10 h-10">
                <span className="font-bold">{review.rating}</span>
                <span className="text-xs">/5</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center md:text-left">
          <div className="flex justify-center md:justify-start mb-4">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-6 h-6 ${
                  i < review.rating ? 'text-yellow-400' : 'text-gray-200'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <blockquote className="relative pl-8 md:pl-12 pr-8 text-lg md:text-xl italic text-gray-700 mb-9">
            <ImQuotesLeft className="absolute top-0 left-0 text-xl md:text-4xl text-green-200 opacity-80 -translate-y-1 md:-translate-y-2" />
            <p className="relative z-10">{review.comment}</p>
            <ImQuotesRight className="float-right text-xl md:text-3xl text-green-200 opacity-80" />
          </blockquote>
          <div className="text-green-600 font-semibold">
            <p className="text-lg">
              {review.userId.name.firstName} {review.userId.name.lastName}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(review.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
