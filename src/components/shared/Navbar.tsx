'use client';

import Image from 'next/image';
import logo from '@/assets/images/logo/feastify.png';
import Link from 'next/link';
import { IoLogOutOutline } from 'react-icons/io5';
import { useUser } from '@/context/UserContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { logout } from '@/services/AuthService';
import { Button } from '../ui/button';
import FTContainer from '../ui/core/FTContainer';

import NavSidebar from '../ui/core/NavSidebar';
import { ShoppingCart } from 'lucide-react';
import { useAppSelector } from '@/redux/hooks';
import { selectCartMeals } from '@/redux/features/cartSlice';

const navItem = [
  {
    path: '/menu',
    text: 'Our Menu',
  },
  {
    path: '/plan',
    text: 'Our Plans',
  },
  {
    path: '/my-menu',
    text: 'My Menu',
  },
  {
    path: '/about',
    text: 'About Us',
  },
];
function Navbar() {
  const { user, setIsLoading } = useUser();
  const cartProducts = useAppSelector(selectCartMeals);

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
  };
  return (
    <div className="shadow-lg">
      <FTContainer>
        <div className="items-center flex md:justify-between px-4">
          <div className="md:hidden">
            <NavSidebar />
          </div>
          <Link href="/" className="flex md:hidden gap-1 mb-1 mr-auto">
            <Image width={30} height={30} src={logo} alt="feastify logo" />
            <p className="font-bold tracking-tighter text-xl self-end">
              Feastify
            </p>
          </Link>
          <div className="hidden md:flex gap-4">
            {/* logo */}
            <Link href="/" className="flex gap-2 items-center ">
              <Image
                className="mb-2"
                width={40}
                height={40}
                src={logo}
                alt="feastify logo"
              />
              <p className="font-bold tracking-tighter text-2xl">Feastify</p>
            </Link>
            {/* list */}

            <ul className="flex font-semibold text-base lg:text-lg">
              {navItem.map((el, id) => (
                <Link
                  key={id}
                  href={el.path}
                  className=" hover:bg-[#d2fa97]/50 px-2  lg:px-5 py-4 transtion duration-300"
                >
                  {el.text}
                </Link>
              ))}
            </ul>
          </div>

          {/* profile */}
          <ul
            className={`flex items-center font-semibold text-base lg:text-lg ${
              !user?.email && 'gap-x-5'
            }`}
          >
            {user?.role === 'customer' && (
              <Link
                href="/cart"
                className="border-r-[2px] border-r-gray-300 pr-3 self-stretch hover:bg-[#d2fa97]/50 px-2 md:px-3 lg:px-5 py-4"
              >
                <div className="relative">
                  <ShoppingCart
                    className="text-gray-800"
                    size={25}
                    strokeWidth={2.4}
                  />
                  {cartProducts.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-700 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartProducts.length}
                    </span>
                  )}
                </div>
              </Link>
            )}
            {user?.email ? (
              <div className="flex items-center gap-2">
                <Link
                  className=" hover:bg-[#d2fa97]/50 px-5 py-4 transtion duration-300"
                  href={`/${user?.role}`}
                >
                  Dashboard
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={
                          user?.profileImg || `https://github.com/shadcn.png`
                        }
                      />
                      <AvatarFallback>User</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href="/profile">
                      <DropdownMenuItem className="cursor-pointer">
                        Profile
                      </DropdownMenuItem>
                    </Link>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="bg-red-500 cursor-pointer"
                      onClick={handleLogOut}
                    >
                      <IoLogOutOutline />
                      <span>Log Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link href="/login">
                <Button
                  variant="outline"
                  className="rounded-xs border border-green-700 px-5 py-3 text-base cursor-pointer"
                >
                  Login
                </Button>
              </Link>
            )}
          </ul>
        </div>
      </FTContainer>
    </div>
  );
}

export default Navbar;
