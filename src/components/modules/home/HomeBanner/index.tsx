import hero1 from '@/assets/images/hero/hero-1.jpg';
import hero2 from '@/assets/images/hero/hero-2.jpg';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
function HomeBanner() {
  return (
    <div className="flex flex-col lg:flex-row bg-orange-100/50 ">
      <Image
        src={hero1}
        alt="hero image"
        className="h-[400px] lg:w-[400px] lg:h-[500px] order-2 lg:order-1 object-cover"
      />
      <div className="text-center px-10 pt-14 pb-4 order-1 lg:order-2">
        <h1 className="uppercase font-thin text-4xl leading-12 max-w-[475px] mx-auto">
          Savor effortless, <br /> homemade meals with America&apos;s #1 meal
          kit!
        </h1>

        <div className="mt-10 mb-6 text-lg">
          <p>
            Enjoy free ready-made meals for life <br /> & 50% off your first
            box!
          </p>
          <span className="mt-2 font-bold">Pause or Cancel Anytime</span>
        </div>
        <div className="text-center mb-3">
          <Button>Get Started</Button>
        </div>

        <span className="text-sm">
          **Offer includes one free ready-made meal per box with an active
          subscription. 20% off applies to the first box for new subscribers,
          discount varies by plan.
        </span>
      </div>

      <Image
        className="h-[400px] lg:w-[400px] lg:h-[500px] order-4 hidden lg:block object-cover"
        src={hero2}
        alt="hero image"
      />
    </div>
  );
}

export default HomeBanner;
