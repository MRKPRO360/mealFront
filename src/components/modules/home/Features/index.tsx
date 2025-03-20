import { Drumstick, CalendarDays, Star, Package } from 'lucide-react';
import FeatureCard from './FeatureCard';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: (
      <Drumstick
        className="w-12 h-12 text-gray-700"
        strokeWidth={1.2}
        aria-label="Protein Icon"
      >
        <title>Protein Source</title>
      </Drumstick>
    ),
    title: 'Plenty of protein',
    alt: 'Chicken drumstick with leaves',
    description:
      "Quality protein matters in a meal delivery service, whether it's chicken, steak, fish, or plant-based.",
  },
  {
    icon: (
      <CalendarDays
        className="w-12 h-12 text-gray-700"
        strokeWidth={1.2}
        aria-label="Calendar Icon"
      >
        <title>Flexible Subscription</title>
      </CalendarDays>
    ),
    title: 'No commitment whatsoever',
    alt: 'Calendar with an arrow',
    description:
      'Skip weeks, pause, or cancel your meal kit subscription at any time.',
  },
  {
    icon: (
      <Star
        className="w-12 h-12 text-gray-700"
        strokeWidth={1.2}
        aria-label="Star Icon"
      >
        <title>5-Star Reviews</title>
      </Star>
    ),
    title: 'The most 5-star reviews among meal kit services',
    description: 'Our huge recipe selection wows week after week.',
    alt: 'Star rating with coffee bean',
  },
  {
    icon: (
      <Package
        className="w-12 h-12 text-gray-700"
        strokeWidth={1.2}
        aria-label="Delivery Box Icon"
      >
        <title>Affordable Meal Delivery</title>
      </Package>
    ),
    alt: 'Food box with dollar sign and leaves',
    title: 'Fresh and affordable meal delivery',
    description: "Chef-created deliciousness that's cheaper than takeout.",
  },
];
export default function FeaturesSection() {
  return (
    <section className="py-16 px-4 border-b container mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-thin mb-14 text-center">
          Why Feastify Meal Kits?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button>Get Offer</Button>
        </div>
      </div>
    </section>
  );
}
