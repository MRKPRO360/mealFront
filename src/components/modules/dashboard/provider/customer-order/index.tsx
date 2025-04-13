'use client';

import { Card } from '@/components/ui/card';

import { IOrder } from '@/types';
import { format } from 'date-fns';
import { ClipboardList, Coins, Edit, Frown, MapPin, Ruler } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function CustomerOrders({ orders }: { orders: IOrder[] }) {
  return (
    <div className="container mx-auto px-3 min-h-screen mt-14 mb-4 space-y-6">
      {orders.length === 0 ? (
        <div className="flex text-lg font-semibold items-center justify-center text-gray-500 gap-2 w-full h-full">
          <Frown />
          <span>No meal orders available.</span>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order._id}>
            <Card className="p-4 shadow-xs">
              <h2 className="text-xl font-semibold mb-4">
                Order Issued:{' '}
                {format(new Date(order.createdAt), 'MMMM dd, yyyy')}
              </h2>
              <div className="space-y-3">
                {order.meals.map((item) => (
                  <div key={item.meal._id}>
                    <div className="flex justify-between flex-wrap items-center gap-y-3 bg-gray-100 p-3 rounded-xs transition duration-300 border-transparent border hover:border-gray-300">
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

                      <div className="flex gap-6 items-center">
                        <p className="flex items-center gap-1 text-gray-700">
                          <ClipboardList className="w-5 h-5 text-green-700" />
                          <strong>Quantity:</strong> {item.quantity}
                        </p>

                        <p className="flex items-center gap-1 text-gray-700">
                          <Ruler className="w-5 h-5 text-green-700" />
                          <strong>Size:</strong> {item.selectedSize}
                        </p>
                        <p className="flex items-center gap-1 text-gray-700">
                          <Coins className="w-5 h-5 text-green-700" />
                          <strong>Price:</strong> ${order.totalAmount}
                        </p>

                        <p className="flex items-center gap-1 text-gray-700">
                          <strong>Status:</strong>{' '}
                          <span
                            className={`px-2 py-1 rounded text-sm font-semibold 
      ${item.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : ''}
      ${item.status === 'Completed' ? 'bg-green-100 text-green-700' : ''}
      ${item.status === 'Cancelled' ? 'bg-red-100 text-red-700' : ''}`}
                          >
                            {item.status}
                          </span>
                        </p>

                        {item.status !== 'Completed' && (
                          <Link href={`/provider/customer-orders/${order._id}`}>
                            <Edit
                              style={{
                                width: 20,
                                height: 20,
                              }}
                              className="text-green-700 cursor-pointer"
                            />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="flex items-center gap-1 text-gray-700">
                <MapPin className="w-5 h-5 text-green-700" />
                Address: {order.shippingAddress}
              </p>
            </Card>
          </div>
        ))
      )}
    </div>
  );
}

export default CustomerOrders;
