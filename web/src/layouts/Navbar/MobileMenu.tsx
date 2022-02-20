import React from "react";

import Image from "next/image";
import Link from "next/link";

import clsx from "clsx";
import { useBoolean } from "usehooks-ts";

import { FaUser } from "react-icons/fa";

import { useAppUser } from "hooks";

import { NavItem } from "./Navbar";
import MobileNavItem from "./MobileNavItem";
import MobileMenuButton from "./MobileMenuButton";

interface Props {
  navItems: Array<NavItem>;
}

const MobileMenu: React.FC<Props> = ({ navItems }) => {
  const { user } = useAppUser();

  const { value, toggle } = useBoolean();

  return (
    <>
      <div className="lg:hidden grow flex">
        <MobileMenuButton show={value} onClick={toggle} />
      </div>

      <div
        className={clsx(
          `absolute left-0 w-full transition-all duration-500 ease-in-out z-50 overflow-hidden`,
          `top-[3.5rem]`,
          {
            "max-h-screen": value,
            "max-h-0": !value,
          }
        )}
      >
        <div className={`flex flex-col gap-5 px-5 py-5 bg-teal-50`}>
          <ul className="flex flex-col text-xl uppercase">
            {navItems.map((item) => (
              <MobileNavItem key={item.href} navItem={item} />
            ))}
          </ul>

          {user ? (
            <>
              <div className="flex items-center gap-3 pb-5 border-b border-slate-200">
                <Image
                  src={user?.picture || ""}
                  width={64}
                  height={64}
                  alt={user?.firstName}
                  className="rounded-full"
                />
                <div className="flex gap-1 text-3xl font-semibold">
                  <span>Hei,</span>
                  <Link href="/profile">
                    <a className="text-teal-500">{user.firstName}!</a>
                  </Link>
                </div>
              </div>

              <div>
                <ul className="flex flex-col gap-3">
                  <li>
                    <Link href="/profile/favorites">
                      <a>Mine favoritter</a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/profile">
                      <a>Profil</a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/api/auth/logout">
                      <a>Logg ut</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div>
              <Link href="/api/auth/login">
                <a className="text-xl uppercase flex items-center gap-3">
                  <FaUser size={20} />
                  <span>Logg Inn</span>
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
