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
function Navbar() {
  const { user, setIsLoading } = useUser();

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
  };
  return (
    <div className="shadow-lg">
      <div className="flex justify-between items-center py-2 px-4">
        <div className="flex items-center gap-x-10 ">
          {/* logo */}
          <Link href="/" className="flex gap-2 items-center ">
            <Image width={40} height={40} src={logo} alt="feastify logo" />
            <p className="font-bold tracking-tighter text-2xl">Feastify</p>
          </Link>
          {/* list */}

          <ul className="flex items-center gap-x-5 font-semibold text-lg">
            <li>
              <Link href="/menu" className="">
                Menu
              </Link>
            </li>
            <li>
              <Link href="/plan" className="">
                Our Plans
              </Link>
            </li>
            <li>
              <Link href="/about" className="">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* profile */}
        <ul className="flex items-center gap-x-5 font-semibold text-lg">
          {user?.email ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      src={user?.profileImg || `https://github.com/shadcn.png`}
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
                  <DropdownMenuItem>
                    <Link href={`/${user?.role}`}>Dashboard</Link>
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
            </>
          ) : (
            <Link href="/login">
              <Button className="rounded-full" variant="outline">
                Login
              </Button>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
