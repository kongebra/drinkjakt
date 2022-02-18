import React, { createContext, useState } from "react";

import MobileNav from "./MobileNav";
import MobileHamburgerButton from "./MobileHamburgerButton";
import DesktopNav from "./DesktopNav";
import NavbarBrand from "./NavbarBrand";
// import NavbarNotification from "./NavbarNotification";
import NavbarProfile from "./NavbarProfile";

export interface NavItem {
  text: string;
  href: string;
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
  const [mobileIsOpen, setMobileIsOpen] = useState(false);

  return (
    <NavbarContext.Provider
      value={{
        mobileIsOpen,
        toggleMobileMenu: () => setMobileIsOpen((prev) => !prev),
      }}
    >
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-cener sm:hidden">
              <MobileHamburgerButton />
            </div>

            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <NavbarBrand />
              <DesktopNav navItems={navItems} />
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* <NavbarNotification /> */}
              <NavbarProfile />
            </div>
          </div>
        </div>

        <MobileNav navItems={navItems} />
      </nav>
    </NavbarContext.Provider>
  );
};

export default Navbar;
