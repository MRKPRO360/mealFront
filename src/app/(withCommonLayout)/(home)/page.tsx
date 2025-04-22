import FeaturesSection from '@/components/modules/home/Features';
import FTBox from '@/components/modules/home/FTBox/inde';
import HomeBanner from '@/components/modules/home/HomeBanner';
import HomeMenuItem from '@/components/modules/home/HomeMenuItem';
import New from '@/components/modules/home/New';
import RecipeReviews from '@/components/modules/home/Reviews';

async function HomePage() {
  return (
    <div>
      <HomeBanner />
      <New />
      <FeaturesSection />
      <HomeMenuItem />
      <RecipeReviews />
      <FTBox />
    </div>
  );
}

export default HomePage;
