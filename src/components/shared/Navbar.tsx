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
function Navbar() {
  const { user, setIsLoading } = useUser();

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
  };
  return (
    <div className="shadow-lg">
      <FTContainer>
        <div className="flex justify-between px-4">
          <div className="flex gap-4">
            {/* logo */}
            <Link href="/" className="flex gap-2 items-center ">
              <Image width={40} height={40} src={logo} alt="feastify logo" />
              <p className="font-bold tracking-tighter text-2xl">Feastify</p>
            </Link>
            {/* list */}

            <ul className="flex font-semibold text-lg">
              <Link
                href="/menu"
                className=" hover:bg-[#d2fa97]/50 px-5 py-3 transtion duration-300"
              >
                Our Menu
              </Link>

              <Link
                href="/plan"
                className=" hover:bg-[#d2fa97]/50 px-5 py-3 transtion duration-300"
              >
                Our Plans
              </Link>

              <Link
                href="/about"
                className=" hover:bg-[#d2fa97]/50 px-5 py-3 transtion duration-300"
              >
                About Us
              </Link>
            </ul>
          </div>

          {/* profile */}
          <ul className="flex items-center gap-x-5 font-semibold text-lg">
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
                    <DropdownMenuItem>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>

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
                <Button className="rounded-xs p-2 text-base">Login</Button>
              </Link>
            )}
          </ul>
        </div>
      </FTContainer>
    </div>
  );
}

export default Navbar;
