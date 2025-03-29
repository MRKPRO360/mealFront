'use client';

import { Button } from '@/components/ui/button';
import {
  grandTotalSelector,
  shippingCostSelector,
  subTotalSelector,
} from '@/redux/features/cartSlice';
// import { currencyFormatter } from '@/lib/currencyFormatter';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';

export default function PaymentDetails() {
  // const user = useUser();

  const router = useRouter();

  const subTotal = useAppSelector(subTotalSelector);
  const shippingCost = useAppSelector(shippingCostSelector);
  const grandTotal = useAppSelector(grandTotalSelector);
  const handleOrder = async () => {
    // if (!user) return toast.error('Please login to order!');
    router.push('/customer/order');
  };

  return (
    <div className=" bg-background brightness-105 rounded-sm col-span-12 sm:col-span-6 lg:col-span-4 h-fit p-5">
      <h1 className="text-2xl font-bold">Payment Details</h1>

      <div className="space-y-2 mt-4">
        <div className="flex justify-between">
          <p className="text-gray-500 ">Subtotal</p>
          <p className="font-semibold">
            {subTotal}
            {/* {currencyFormatter(subTotal)} */}
          </p>
        </div>
        {/* <div className="flex justify-between">
          <p className="text-gray-500 ">Discount</p>
          <p className="font-semibold">
            10
            {currencyFormatter(discountAmount)}
          </p>
        </div> */}
        <div className="flex justify-between">
          <p className="text-gray-500 ">Shipment Cost</p>
          <p className="font-semibold">
            {/* {currencyFormatter(shippingCost)} */}

            {shippingCost}
          </p>
        </div>
      </div>
      <div className="flex justify-between mt-10 mb-5">
        <p className="text-gray-500 ">Grand Total</p>
        <p className="font-semibold">
          {/* {currencyFormatter(grandTotal)} */}
          {grandTotal}
        </p>
      </div>

      <Button
        disabled={!shippingCost}
        onClick={handleOrder}
        className="w-full text-xl font-semibold py-5"
      >
        Order Now
      </Button>
    </div>
  );
}
