'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { BsPerson } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';
import { useAppSelector } from '@/redux/hooks';
import { userNameAndEmailSelector } from '@/redux/features/cartSlice';
import OrderForm from '@/components/modules/dashboard/customer/order';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK as string);

const OrderId = () => {
  // const id = router.query?.orderId;
  const user = useAppSelector(userNameAndEmailSelector);

  return (
    <div className="my-16 mb-16 max-w-[1440px] w-[95%] mx-auto">
      <div className="w-3/4 mx-auto">
        <div className="space-y-5">
          <h2 className="text-lg font-semibold sm:text-xl">User Information</h2>
          <div className="flex items-center gap-1 outline-none">
            <BsPerson className="text-xl text-secondary/60" />
            <span className="w-full">{user?.name}</span>
          </div>
          <div className="flex items-center gap-1 outline-none">
            <MdOutlineEmail className="text-xl text-secondary/60" />
            <span className="w-full">{user?.email}</span>
          </div>
        </div>
        <div className="my-8 rounded-md shadow-md shadow-secondary/text-secondary/60/60">
          <Elements stripe={stripePromise}>
            <OrderForm />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default OrderId;
