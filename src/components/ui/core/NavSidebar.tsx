import {
  ClipboardList,
  Info,
  Menu,
  NotebookPen,
  ShoppingCart,
  Utensils,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../button';
import Link from 'next/link';
function NavSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="lg"
          variant="link"
          className="relative cursor-pointer mr-4"
          style={{
            padding: 0,
          }}
        >
          <Menu style={{ width: 23, height: 23 }} />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[300px]  flex flex-col gap-4 py-6 bg-white shadow-lg rounded-xs max-w-md"
      >
        <SheetHeader>
          <SheetTitle className="mt-8">
            <Link href="/cart">
              <Button
                style={{
                  width: 'calc(100% - 24px)',
                  margin: ' 0 12px',
                }}
                className="rounded-xs border-[2px] border-green-700 text-base cursor-pointer"
              >
                <ShoppingCart
                  className="text-white"
                  style={{ width: 23, height: 23 }}
                  strokeWidth={2.4}
                />
              </Button>
            </Link>
          </SheetTitle>

          <ul className="flex flex-col font-medium text-base mt-4 gap-2">
            <Link href="/menu">
              <div className="hover:bg-[#d2fa97]/50  px-6 hover:px-7 py-3 transtion duration-300 flex items-center gap-2 ">
                <Utensils />
                Our Menu
              </div>
            </Link>

            <Link href="/plan">
              <div className="hover:bg-[#d2fa97]/50  px-6 hover:px-7 py-3 transtion duration-300 flex items-center gap-2">
                <ClipboardList />
                Our Plans
              </div>
            </Link>

            <Link href="/my-menu">
              <div className="hover:bg-[#d2fa97]/50  px-6 hover:px-7 py-3 transtion duration-300 flex items-center gap-2">
                <NotebookPen />
                My Menu
              </div>
            </Link>

            <Link href="/about">
              <div className="hover:bg-[#d2fa97]/50  px-6 hover:px-7 py-3 transtion duration-300 flex items-center gap-2">
                <Info />
                About Us
              </div>
            </Link>
          </ul>
        </SheetHeader>

        {/* <div className="flex-1 overflow-y-auto">
          {SidebarData.items.length > 0 ? (
            <ul className="space-y-4">
              {SidebarData.items.map((item) => (
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
                    // onClick={() => dispatch(removeFromSidebar(item.product))}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">Your NavSidebar is empty.</p>
          )}

          <div className="border-b my-3"></div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">
              Total Quantity:
            </span>
            <span className="text-lg font-bold">{SidebarData.totalQuantity}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">
              Total Price:
            </span>
            <span className="text-lg font-bold">
              ${SidebarData.totalPrice.toFixed(2)}
            </span>
          </div>
        </div> */}
      </SheetContent>
    </Sheet>
  );
}

export default NavSidebar;
