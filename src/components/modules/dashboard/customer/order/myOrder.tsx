'use client';

import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import { IMeta, IOrder } from '@/types';
import Image from 'next/image';

import Link from 'next/link';
import TablePagination from '@/components/ui/core/FTTable/TablePagination';
import { Frown } from 'lucide-react';

const MyOrders = ({ orders, meta }: { orders: IOrder[]; meta: IMeta }) => {
  return (
    <div className="container mx-auto px-3 min-h-screen mt-14 mb-4 space-y-6">
      {orders.length === 0 ? (
        <div className="flex text-lg font-semibold items-center justify-center text-gray-500 gap-2 w-full h-full">
          <Frown />
          <span>No meal order available.</span>
        </div>
      ) : (
        orders.map((order, index) => (
          <Card key={index} className="p-4 shadow-xs">
            <h2 className="text-xl font-semibold mb-4">
              Order Issued: {format(new Date(order.createdAt), 'MMMM dd, yyyy')}
            </h2>
            <div className="space-y-3">
              {order.meals.map((item) => (
                <div
                  key={item.meal._id}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded-xs transition duration-300 border-transparent border hover:border-gray-300"
                >
                  <Link
                    href={`/recipe/${item.meal._id}`}
                    className="flex items-center gap-4 transition duration-300 ease-in font-semibold  hover:underline hover:text-green-700"
                  >
                    <Image
                      width={56}
                      height={56}
                      src={item.meal.recipeImage}
                      alt={item.meal.recipeName}
                      className="w-14 h-14 rounded-md object-cover"
                    />
                    <p>{item.meal.recipeName}</p>
                  </Link>

                  <div className="flex gap-6">
                    <p>
                      <strong>Quantity:</strong> {item.quantity}
                    </p>
                    <p>
                      <strong>Price:</strong> $
                      {item.meal.portionSizes[item.selectedSize].price}
                    </p>
                    <p>
                      <strong>Status:</strong>{' '}
                      <span
                        className={`px-2 py-1 rounded text-sm font-semibold 
      ${item.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : ''}
      ${item.status === 'Completed' ? 'bg-green-100 text-green-700' : ''}
      ${item.status === 'Cancelled' ? 'bg-red-100 text-red-700' : ''}
    `}
                      >
                        {item.status}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* <div className="flex gap-3">
              <FTModal
                title={`Are you sure to delete Week: ${format(
                  new Date(plan.week),
                  'MMMM dd, yyyy'
                )}?`}
                description="This action cannot be undone. This will permanently delete your weekly plan :("
                onConfirm={() => deleteWeek(plan.week)}
              >
                <Button className="w-full" variant="outline">
                  <Trash className="text-red-700" /> Delete Entire Week
                </Button>
              </FTModal>
              <Link href={`/customer/update-meal-plan/${plan.week}`}>
                <Button className="" variant="outline">
                  <Edit className="text-green-700" /> Update Weekly Plan
                </Button>
              </Link>
            </div> */}
          </Card>
        ))
      )}
      <TablePagination totalPage={meta?.totalPage} />
    </div>
  );
};

export default MyOrders;
