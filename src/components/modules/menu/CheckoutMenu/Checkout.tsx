import { IMenuName } from '@/types';
import { ImLeaf } from 'react-icons/im';

function Checkout({ menuNames }: { menuNames: IMenuName[] }) {
  return (
    <div className="bg-amber-50/50 py-10">
      <div className="container mx-auto">
        <h3 className="text-2xl font-semibold text-center mb-4">
          Checkout our weekly menus!
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 justify-items-start gap-6">
          {menuNames?.map((el) => (
            <div
              key={el._id}
              className="lg:nth-of-type-[3]:justify-self-end lg:nth-of-type-[6]:justify-self-end lg:nth-of-type-[5]:justify-self-center lg:nth-of-type-[2]:justify-self-center text-green-800 flex items-center gap-2"
            >
              <ImLeaf className="text-xl" />
              <a
                href={`#${el.name}`}
                className="font-semibold text-lg underline"
              >
                {el.name} recipe menu
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
