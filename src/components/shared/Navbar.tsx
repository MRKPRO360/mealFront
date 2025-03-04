import Image from 'next/image';
import logo from '@/assets/images/logo/feastify.png';
import Link from 'next/link';
function Navbar() {
  return (
    <div className="shadow-md ">
      <div className="flex justify-between items-center py-2 px-4">
        <div className="flex items-center gap-x-10 ">
          {/* logo */}
          <div className="flex gap-2 items-center ">
            <Image width={40} height={40} src={logo} alt="feastify logo" />
            <p className="font-bold tracking-tighter text-2xl">Feastify</p>
          </div>
          {/* list */}

          <ul className="flex items-center gap-x-5 font-semibold text-lg">
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
          <li>Login</li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
