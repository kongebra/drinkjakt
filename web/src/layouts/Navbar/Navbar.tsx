import React, { createContext, useMemo, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import clsx from "clsx";

import { FaSearch, FaUser } from "react-icons/fa";

import MobileMenu from "./MobileMenu";
import DesktopNavItem from "./DesktopNavItem";

import { useAppUser } from "hooks";
import { IconType } from "react-icons/lib";

export interface NavItem {
  text: string;
  href: string;
  active?: boolean;
  icon?: IconType;
}

export interface NavbarProps {
  navItems: Array<NavItem>;
}

export interface NavbarContextProps {
  mobileIsOpen: boolean;
  toggleMobileMenu: () => void;
}

const defaultValue: NavbarContextProps = {
  mobileIsOpen: false,
  toggleMobileMenu: () => {},
};

export const NavbarContext = createContext<NavbarContextProps>(defaultValue);

const Navbar: React.FC<NavbarProps> = ({ navItems }) => {
  const router = useRouter();

  const { user, isLoading } = useAppUser();

  const mappedNavItems = useMemo<Array<NavItem>>(() => {
    return navItems.map((x) => ({ ...x, active: router.asPath === x.href }));
  }, [navItems, router.asPath]);

  const [mobileIsOpen, setMobileIsOpen] = useState(false);

  return (
    <NavbarContext.Provider
      value={{
        mobileIsOpen,
        toggleMobileMenu: () => setMobileIsOpen((prev) => !prev),
      }}
    >
      <nav className="bg-white">
        <div className="lg:container lg:mx-auto">
          <div
            className={clsx(
              "flex gap-0 lg:gap-5 items-center justify-between relative",
              "lg:h-20",
              `h-[3.5rem]`
            )}
          >
            {/* BRAND / LOGO */}
            <div className="w-1/3 lg:w-auto flex lg:flex-initial justify-center lg:justify-start items-center">
              <Link href="/">
                <a className="text-xl lg:text-3xl font-bold">
                  <span>Drink</span>
                  <span className="text-teal-500 font-extrabold">Jakt</span>
                </a>
              </Link>
            </div>

            {/* DESKTOP MENU */}
            <div className="hidden lg:flex items-center grow">
              <ul className={clsx("flex items-center lg:h-20")}>
                {mappedNavItems.map((item) => {
                  return <DesktopNavItem key={item.href} navItem={item} />;
                })}
              </ul>
            </div>

            {/* PROFILE */}
            {isLoading ? null : (
              <div className="hidden lg:block">
                {user ? (
                  <Link href="/profile">
                    <a className="flex items-center gap-3">
                      <Image
                        src={user?.picture || ""}
                        width={32}
                        height={32}
                        alt={user?.firstName}
                        className="rounded-full"
                      />
                      <span className="uppercase text-teal-500 font-semibold">
                        Min profil
                      </span>
                    </a>
                  </Link>
                ) : (
                  <Link href="/api/auth/login">
                    <a className="flex items-center gap-3">
                      <FaUser size={24} />

                      <span className="uppercase font-semibold">Logg Inn</span>
                    </a>
                  </Link>
                )}
              </div>
            )}

            {/* SEARCH DESKTOP */}
            <div className={clsx("hidden lg:flex items-center lg:h-20")}>
              <form action="/search">
                <button type="submit">
                  <FaSearch className="z-20 hover:text-teal-500" />
                </button>
                <input
                  type="search"
                  name="query"
                  className="h-14 pr-8 pl-5 rounded z-0 focus:outline-none"
                  placeholder="Søk i DrinkJakt"
                />
              </form>
            </div>

            {/* SEARCH MOBILE */}
            <div className={clsx("w-1/3 lg:hidden flex", `h-[3.5rem]`)}>
              <Link href="/search">
                <a
                  className={clsx(
                    "grow bg-teal-800 text-white flex justify-center items-center",
                    `h-[3.5rem]`
                  )}
                >
                  <FaSearch size={24} />
                </a>
              </Link>
            </div>

            {/* MOBILE MENU */}
            <MobileMenu navItems={mappedNavItems} />
          </div>
        </div>
      </nav>
    </NavbarContext.Provider>
  );
};

export default Navbar;
