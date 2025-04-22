import { getAllRecipeReviews } from '@/services/ReviewService';
import { ReviewCard } from './ReviewCard';
import FTCarousel from '@/components/ui/core/FTCarousel';
import { IReview } from '@/types';
import FTSectionHeader from '@/components/ui/core/FTSectionHeader';

const RecipeReviews = async () => {
  const { data } = await getAllRecipeReviews();
  const reviewData = data.filter((el: IReview) => el.rating >= 4);
  return (
    <section className="container mx-auto my-14 lg:my-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-20 to-gray-50">
      <div className="text-center mb-10">
        <FTSectionHeader>Customer Experiences</FTSectionHeader>
        <p className="mt-4 text-lg text-gray-800 tracking-tight">
          Discover what our community says about their culinary journey with us
        </p>
      </div>

      <FTCarousel autoPlay={true} interval={5000}>
        {reviewData.map((review: IReview) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </FTCarousel>

      {/* <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Share Your Experience
          </button>
        </div> */}
    </section>
  );
};

export default RecipeReviews;
