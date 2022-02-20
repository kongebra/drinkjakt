import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import clsx from "clsx";

import { NavItem } from "./Navbar";

interface Props {
  height: string;

  navItem: NavItem;
}

const DesktopNavItem: React.FC<Props> = ({ height, navItem }) => {
  const router = useRouter();

  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(router.asPath === navItem.href);
  }, [navItem.href, router.asPath]);

  return (
    <li
      className={clsx("uppercase hover:text-teal-500", height, {
        "text-teal-500": active,
      })}
    >
      <Link href={navItem.href}>
        <a className={clsx("flex items-center px-5", height)}>
          <span>{navItem.text}</span>
        </a>
      </Link>
    </li>
  );
};

export default DesktopNavItem;
