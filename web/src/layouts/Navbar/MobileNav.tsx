import React, { useContext } from "react";

import clsx from "clsx";

import Link from "next/link";
import { useRouter } from "next/router";

import { NavbarContext, NavItem } from "./Navbar";

interface Props {
  navItems: Array<NavItem>;
}

const MobileNav = ({ navItems }: Props) => {
  const router = useRouter();

  const { mobileIsOpen } = useContext(NavbarContext);

  return (
    <div
      className={clsx(mobileIsOpen ? "" : "hidden", "sm:hidden")}
      id="mobile-menu"
    >
      <div className="px-2 pt-2 pb-3 space-y-1">
        {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
        {navItems.map((item, index) => (
          <Link key={`${item.href}_${index}`} href={item.href}>
            <a
              className={
                router.asPath === item.href
                  ? "bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              }
              aria-current={router.asPath === item.href ? "page" : undefined}
            >
              {item.text}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
