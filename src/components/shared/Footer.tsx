import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import FTContainer from '../ui/core/FTContainer';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/images/logo/feastify.png';
import { Button } from '../ui/button';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-4 rounded-xs">
      <FTContainer>
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo & Socials */}
            <div className="flex flex-col items-center md:items-start">
              <h2 className="text-2xl font-bold text-white">
                <Link href="/" className="flex gap-2 items-end ">
                  <Image
                    width={40}
                    height={40}
                    src={logo}
                    alt="feastify logo"
                  />
                  <p className="font-bold tracking-tighter text-2xl">
                    Feastify
                  </p>
                </Link>
              </h2>
              <p className="mt-2 text-sm">
                Delicious meals, delivered fresh to your door.
              </p>
              <div className="flex gap-4 mt-4">
                <a
                  href="#"
                  className="p-2 bg-gray-800 rounded-full hover:text-white hover:bg-green-700 transition"
                >
                  <FaFacebookF size={18} />
                </a>
                <a
                  href="#"
                  className="p-2 bg-gray-800 rounded-full hover:text-white hover:bg-pink-500 transition"
                >
                  <FaInstagram size={18} />
                </a>
                <a
                  href="#"
                  className="p-2 bg-gray-800 rounded-full hover:text-white hover:bg-blue-400 transition"
                >
                  <FaTwitter size={18} />
                </a>
                <a
                  href="#"
                  className="p-2 bg-gray-800 rounded-full hover:text-white hover:bg-red-500 transition"
                >
                  <FaYoutube size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-green-700 transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-700 transition">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-700 transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-700 transition">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
              <p className="text-sm mt-2">
                Subscribe to our newsletter for the latest recipes and deals.
              </p>
              <div className="flex mt-3 w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-l bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-10 text-center border-t border-gray-700 pt-6 text-sm">
            © {new Date().getFullYear()} Feastify. All rights reserved.
          </div>
        </div>
      </FTContainer>
    </footer>
  );
}

export default Footer;
