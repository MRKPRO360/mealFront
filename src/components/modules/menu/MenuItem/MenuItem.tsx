import { IMenuName } from '@/types';
import { MenuItemCarousel } from './MenuItemCarousel';

async function MenuItem({ menuNames }: { menuNames: IMenuName[] }) {
  return (
    <div className="my-16 container mx-auto">
      <div className="text-center mb-5">
        <h1 className="uppercase font-thin text-3xl mb-1 leading-12">
          Select from over 100 weekly menu and market items
        </h1>
        <p>
          Including the latest seasonal and convenient options at HelloFresh
          Market for extra culinary inspiration.
        </p>
      </div>

      {/* CAROUSEL */}
      <MenuItemCarousel menuNames={menuNames} />
    </div>
  );
}

export default MenuItem;
