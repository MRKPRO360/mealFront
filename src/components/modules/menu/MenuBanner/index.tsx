import { Button } from '@/components/ui/button';
import styles from '../MenuBanner/menuBanner.module.css';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/images/logo/feastify.png';

function MenuBanner() {
  return (
    <div className={`${styles.menuBanner} text-center px-10 pt-14 pb-4`}>
      <div className="max-w-[550px] mx-auto">
        <Link href="/" className="flex gap-2 items-end justify-center mb-4 ">
          <Image width={50} height={50} src={logo} alt="feastify logo" />
          <p className="font-bold tracking-tighter text-2xl">Feastify</p>
        </Link>
        <h1 className="uppercase font-thin text-4xl leading-12 ">
          Tasty Weekly Menus and Customizable Plans for Effortless Home Cooking
        </h1>

        <div className="mt-10 mb-6 text-lg">
          <p>
            Discover our mouthwatering menus and adaptable plans, crafted to
            deliver gourmet recipes and farm-fresh ingredients straight to your
            kitchen every week!
          </p>
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
    </div>
  );
}

export default MenuBanner;
