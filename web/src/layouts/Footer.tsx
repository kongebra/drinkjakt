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
      href: "https://facebook.com/drinkkart",
      icon: <FaFacebook />,
    },
    {
      href: "https://instagram.com/drinkkart",
      icon: <FaInstagram />,
    },
    {
      href: "https://twitter.com/drinkkart",
      icon: <FaTwitter />,
    },
  ];

  return (
    <footer className="bg-light">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <Link href="/" passHref>
              <a className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                <strong>DrinkJakt</strong>
              </a>
            </Link>
            <span className="text-muted">
              &copy; {new Date().getFullYear()} kongebra.net
            </span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            {socials.map((item, index) => (
              <li className="ms-3" key={index}>
                <a href={item.href} target="_blank" className="text-muted">
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
