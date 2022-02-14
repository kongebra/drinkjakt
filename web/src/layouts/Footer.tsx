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
    <footer className="bg-dark text-light">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <Link href="/" passHref>
              <a className="mb-3 me-2 mb-md-0 text-light text-decoration-none lh-1">
                <strong>DrinkJakt</strong>
              </a>
            </Link>
            <span>
              &copy; {new Date().getFullYear()}{" "}
              <a href="https://kongebra.net" target="_blank">
                kongebra.net
              </a>
            </span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            {socials.map((item, index) => (
              <li className="ms-3" key={index}>
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
