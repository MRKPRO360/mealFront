import left from '@/assets/images/new/left.png';
import middle from '@/assets/images/new/middle.jpg';
import right from '@/assets/images/new/right.png';

import { Button } from '@/components/ui/button';
import NewFeaturedCard from './NewFeaturedCard';

const featuredCardItem = [
  {
    title: 'Ready Made Meals',
    img: left,
    text: 'Easy life easy meal',
  },
  {
    title: 'Pre & Bake',
    img: middle,
    text: 'Cook your favorite meal',
  },
  {
    title: '15-Min Meals',
    img: right,
    text: 'Cook is peace of cake',
  },
];

function New() {
  return (
    <div className="py-16 px-4 border-b container mx-auto">
      <h2 className="text-3xl font-thin mb-8 text-center">
        Choose Your Meal at Feastify <br /> Fast, Easy Meals for Every Schedule
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-4">
        {featuredCardItem.map((el, id) => (
          <NewFeaturedCard item={el} key={id} />
        ))}
      </div>
      <div className="text-center mt-3">
        <Button>Get Started</Button>
      </div>
    </div>
  );
}

export default New;
