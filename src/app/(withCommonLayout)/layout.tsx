import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import FTContainer from '@/components/ui/core/FTContainer';

function HomePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <FTContainer>{children}</FTContainer>
      <Footer />
    </div>
  );
}

export default HomePageLayout;
