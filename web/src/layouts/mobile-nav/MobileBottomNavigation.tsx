import React, { useContext } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import clsx from "clsx";

import { NavItem } from "layouts/Navigation";
import { MobileNavigationContext } from "./MobileNavigation";

export interface MobileBottomNavigationProps {
  navItems: NavItem[];
}

const MobileBottomNavigation: React.FC<MobileBottomNavigationProps> = ({
  navItems,
}) => {
  const router = useRouter();

  const { setFalse } = useContext(MobileNavigationContext);

  return (
    <nav className="block fixed inset-x-0 bottom-0 z-20 bg-white shadow lg:hidden">
      <div className="flex justify-between h-16">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <a
              className={clsx(
                "flex-1 flex flex-col justify-center items-center py-2",
                {
                  "bg-sky-100": router.asPath === item.href,
                }
              )}
              onClick={setFalse}
            >
              {item.icon && <item.icon className="text-2xl mb-1" />}
              <span className="text-xs">{item.text}</span>
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNavigation;
