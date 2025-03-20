import { IFeaturedCard } from '@/types';
import Image from 'next/image';

function NewFeaturedCard({ item }: IFeaturedCard) {
  return (
    <div className="text-center">
      <Image
        className="w-full h-[250px] rounded-md object-cover not-even:bg-orange-100/20"
        src={item.img}
        alt={item.title}
      />
      <div className="my-5">
        <h3 className="font-bold uppercase tracking-tighter">{item.title}</h3>
        <p>{item.text}</p>
      </div>
    </div>
  );
}

export default NewFeaturedCard;
