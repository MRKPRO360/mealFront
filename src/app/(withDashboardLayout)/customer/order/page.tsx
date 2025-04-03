'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { Info, User } from 'lucide-react';
import { MdEmail } from 'react-icons/md';
import { useAppSelector } from '@/redux/hooks';
import { userNameAndEmailSelector } from '@/redux/features/cartSlice';
import OrderForm from '@/components/modules/dashboard/customer/order/createOrder';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK as string);

const OrderId = () => {
  // const id = router.query?.orderId;
  const user = useAppSelector(userNameAndEmailSelector);

  return (
    <div className="my-16 mb-16 max-w-[1440px] w-[95%] mx-auto">
      <div className="w-3/4 mx-auto">
        <div className="space-y-5">
          <h2 className="text-lg font-semibold sm:text-xl">User Information</h2>
          <div className="flex items-center gap-1 border-b border-dashed">
            <User />
            <span className="w-full">{user?.name}</span>
          </div>
          <div className="flex items-center gap-1 border-b border-dashed">
            <MdEmail />
            <span className="w-full">{user?.email}</span>
          </div>
        </div>
        <div className="my-8 rounded-md shadow-md shadow-secondary/text-secondary/60/60">
          <Elements stripe={stripePromise}>
            <OrderForm />
          </Elements>
        </div>
        <div className="flex gap-1">
          <Info className="text-red-500" />
          <span className="text-gray-500">
            Once you&apos;ve paid you can&apos;t revert it back :(
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderId;
