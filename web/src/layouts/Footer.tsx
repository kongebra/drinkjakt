import React from "react";

import Link from "next/link";

import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

interface Social {
  icon: React.ReactNode;
  href: string;
}

const Footer = () => {
  const socials: Array<Social> = [
    {
      href: "https://facebook.com/drinkjakt",
      icon: <FaFacebook />,
    },
    {
      href: "https://instagram.com/drinkjakt",
      icon: <FaInstagram />,
    },
    {
      href: "https://twitter.com/drinkjakt",
      icon: <FaTwitter />,
    },
  ];

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center flex-wrap py-3 my-4">
          <div className="flex items-center gap-2">
            <Link href="/" passHref>
              <a className="font-bold hover:underline">DrinkJakt</a>
            </Link>
            <span>&copy; {new Date().getFullYear()}</span>
            <a
              href="https://kongebra.net"
              target="_blank"
              className="hover:underline"
            >
              kongebra.net
            </a>
          </div>

          <ul className="flex justify-end list-none gap-3">
            {socials.map((item, index) => (
              <li key={index}>
                <a href={item.href} target="_blank">
                  {item.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
