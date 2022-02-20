import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import clsx from "clsx";

import { NavItem } from "./Navbar";

interface Props {
  navItem: NavItem;
}

const MobileNavItem: React.FC<Props> = ({ navItem }) => {
  const router = useRouter();

  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(router.asPath === navItem.href);
  }, [navItem.href, router.asPath]);

  return (
    <li
      className={clsx("active:text-teal-500", `h-[3.5rem]`, {
        "text-teal-500": active,
      })}
    >
      <Link href={navItem.href}>
        <a className={clsx("flex navItems-center", `h-[3.5rem]`)}>
          <span>{navItem.text}</span>
        </a>
      </Link>
    </li>
  );
};

export default MobileNavItem;
