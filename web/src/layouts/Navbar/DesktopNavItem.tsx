import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import clsx from "clsx";

import { NavItem } from "./Navbar";

interface Props {
  navItem: NavItem;
}

const DesktopNavItem: React.FC<Props> = ({ navItem }) => {
  const router = useRouter();

  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(router.asPath === navItem.href);
  }, [navItem.href, router.asPath]);

  return (
    <li
      className={clsx("uppercase hover:text-teal-500 lg:h-20", {
        "text-teal-500": active,
      })}
    >
      <Link href={navItem.href}>
        <a className={clsx("flex items-center px-5 lg:h-20")}>
          <span>{navItem.text}</span>
        </a>
      </Link>
    </li>
  );
};

export default DesktopNavItem;
