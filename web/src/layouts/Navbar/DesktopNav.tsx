import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { NavItem } from "./Navbar";

interface Props {
  navItems: Array<NavItem>;
}

const DesktopNav = ({ navItems }: Props) => {
  const router = useRouter();

  return (
    <div className="hidden sm:block sm:ml-6">
      <div className="flex space-x-4">
        {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
        {navItems.map((item) => (
          <Link href={item.href}>
            <a
              className={
                router.asPath === item.href
                  ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
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

export default DesktopNav;
