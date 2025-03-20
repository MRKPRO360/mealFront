import FeaturesSection from '@/components/modules/home/Features';
import HomeBanner from '@/components/modules/home/HomeBanner';
import New from '@/components/modules/home/New';

function HomePage() {
  return (
    <div>
      <HomeBanner />
      <New />
      <FeaturesSection />
    </div>
  );
}

export default HomePage;
