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
function Navbar() {
  const { user, setIsLoading } = useUser();

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
  };
  return (
    <div className="shadow-lg">
      <FTContainer>
        <div className="items-center flex md:justify-between py-1 md:py-0 px-4">
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

            <ul className="flex font-semibold text-lg">
              <Link
                href="/menu"
                className=" hover:bg-[#d2fa97]/50 px-2 md:px-3 lg:px-5 py-3 transtion duration-300"
              >
                Our Menu
              </Link>

              <Link
                href="/plan"
                className=" hover:bg-[#d2fa97]/50 px-2 md:px-3 lg:px-5 py-3 transtion duration-300"
              >
                Our Plans
              </Link>

              <Link
                href="/my-menu"
                className=" hover:bg-[#d2fa97]/50 px-2 md:px-3 lg:px-5 py-3 transtion duration-300"
              >
                My Menu
              </Link>
              <Link
                href="/about"
                className=" hover:bg-[#d2fa97]/50 px-2 md:px-3 lg:px-5 py-3 transtion duration-300"
              >
                About Us
              </Link>
            </ul>
          </div>

          {/* profile */}
          <ul className="flex items-center gap-x-5 font-semibold text-lg">
            <Link
              href="/cart"
              className="border-r-[2px] border-r-gray-300 pr-3 self-stretch hover:bg-[#d2fa97]/50 px-2 md:px-3 lg:px-5 py-3"
            >
              <ShoppingCart
                className="text-gray-800"
                size={25}
                strokeWidth={2.4}
              />
            </Link>
            {user?.email ? (
              <div className="flex items-center gap-2">
                <Link
                  className=" hover:bg-[#d2fa97]/50 px-5 py-3 transtion duration-300"
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
