import { StaticImageData } from 'next/image';

export interface IFeaturedCard {
  item: { img: StaticImageData; title: string; text: string };
}
