import React from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import clsx from "clsx";

import { NavItem } from "layouts/Navbar/Navbar";

export interface ProfileTabsProps {
  navItems: Array<NavItem>;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ navItems }) => {
  const router = useRouter();

  return (
    <ul className="flex gap-5 pb-0.5 border-b border-slate-300">
      {navItems.map((item) => (
        <li
          key={item.href}
          className={clsx("pb-1 border-b-4", {
            "border-teal-500": router.asPath === item.href,
          })}
        >
          <Link href={item.href}>
            <a
              className={clsx("text-lg hover:text-teal-500", {
                "text-teal-500 font-semibold": router.asPath === item.href,
              })}
            >
              {item.text}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ProfileTabs;
