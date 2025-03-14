import { Badge, ShoppingBagIcon } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../button';
function Cart() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" className="relative cursor-pointer">
          <ShoppingBagIcon className="h-6 w-6" />
          <Badge className="absolute right-0 top-0 bg-red-600 text-white rounded-full text-xs p-1">
            {/* {cartData.totalQuantity} */}
            20
          </Badge>
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col gap-4 px-2 py-6 bg-white shadow-lg rounded-xs max-w-md">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-xl font-semibold">Your Cart</SheetTitle>
          <SheetDescription className="text-sm text-gray-500">
            Review your items and proceed to checkout.
          </SheetDescription>
        </SheetHeader>

        {/* <div className="flex-1 overflow-y-auto">
          {cartData.items.length > 0 ? (
            <ul className="space-y-4">
              {cartData.items.map((item) => (
                <li key={item.product} className="flex items-center gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-16 w-16 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        // onClick={() =>
                        //   dispatch(
                        //     updateQuantity({
                        //       id: item.product,
                        //       quantity: Math.max(item.quantity - 1, 1),
                        //     })
                        //   )
                        // }
                        className="w-6 h-6 bg-gray-200 text-black rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        // onClick={() =>
                        //   dispatch(
                        //     updateQuantity({
                        //       id: item.product,
                        //       quantity: Math.min(item.quantity + 1, item.stock),
                        //     })
                        //   )
                        // }
                        className="w-6 h-6 bg-gray-200 text-black rounded hover:bg-gray-300"
                    
                    >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">
                    ${(item.quantity * item.price).toFixed(2)}
                  </p>
                  <button
                    // onClick={() => dispatch(removeFromCart(item.product))}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}

          <div className="border-b my-3"></div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">
              Total Quantity:
            </span>
            <span className="text-lg font-bold">{cartData.totalQuantity}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">
              Total Price:
            </span>
            <span className="text-lg font-bold">
              ${cartData.totalPrice.toFixed(2)}
            </span>
          </div>
        </div> */}

        <SheetFooter className="border-t p-0 py-4">
          <SheetClose asChild>
            <Button
              className="w-[100%]"
              // onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default Cart;
