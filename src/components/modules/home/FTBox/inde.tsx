import Image from 'next/image';

import FTBoxImage from '@/assets/images/box/box.png';
import { FaCheck } from 'react-icons/fa6';
import FTSectionHeader from '@/components/ui/core/FTSectionHeader';

const boxText = [
  {
    title: 'Farm-fresh ingredients',
    description:
      'Seasonal vegetables and premium produce hand-selected to bring maximum flavor to every recipe.',
  },
  {
    title: 'Chef-designed recipes',
    description:
      'Easy-to-follow instructions with clear nutritional info, perfect for cooks of all experience levels.',
  },

  {
    title: 'Customizable options',
    description:
      'Personalize your box with extra snacks, sides, or additional proteins to suit your tastes.',
  },

  {
    title: 'Flexible meal choices',
    description:
      'Mix and match from various cuisines and dietary preferences (vegetarian, family-friendly, quick meals).',
  },
  {
    title: 'Eco-friendly packaging',
    description:
      'Temperature-controlled, sustainable materials keep ingredients fresh while minimizing waste with perfectly portioned ingredients.',
  },
];

function FTBox() {
  return (
    <div className="container mx-auto flex flex-col lg:flex-row overflow-hidden gap-8 my-16 items-center px-4">
      <div className="relative w-full lg:w-[600px] h-[350px] lg:h-[580px] overflow-hidden">
        {' '}
        {/* Set desired height */}
        <Image
          src={FTBoxImage}
          alt="Inside Feastify meal box"
          fill
          className="object-cover" // or object-contain
          sizes="(max-width: 512px) 100vw, 80vw"
          priority
        />
      </div>
      <div className="sm:flex-1/2">
        <FTSectionHeader>
          What&apos;s Included in our Feastify meal kits?{' '}
        </FTSectionHeader>
        <p className="my-4 text-lg text-gray-800 tracking-tight">
          Every delivery from our meal service brings you carefully crafted meal
          kits designed to make cooking enjoyable, effortless, and delicious.
          Here&apos;s what you&apos;ll find inside:{' '}
        </p>

        {/* <h2 className="text-3xl font-thin mb-8 text-center"></h2>
        <p className="mb-4">
          Every delivery from our meal service brings you carefully crafted meal
          kits designed to make cooking enjoyable, effortless, and delicious.
          Here&apos;s what you&apos;ll find inside:
        </p> */}

        <div className="space-y-4 md:space-y-5">
          {boxText.map((item, index) => (
            <div key={index} className="flex gap-3 md:gap-4 items-start">
              <div className="flex-shrink-0 mt-1 text-green-600">
                <FaCheck className="text-xl md:text-2xl" />
              </div>
              <p className="text-gray-800">
                <span className="font-bold text-gray-900">{item.title}:</span>
                &nbsp;{item.description}
              </p>
            </div>

            //           <div key={index} className="flex gap-3 items-start p-3 bg-amber-50 rounded-lg">
            //   <div className="flex-shrink-0 p-1.5 bg-green-100 rounded-full">
            //     <FaCheck className="text-lg text-green-600" />
            //   </div>
            //   <div>
            //     <h3 className="font-semibold text-gray-900">{item.title}</h3>
            //     <p className="text-gray-700 mt-1">{item.description}</p>
            //   </div>
            // </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FTBox;
