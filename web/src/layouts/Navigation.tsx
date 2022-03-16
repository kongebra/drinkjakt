import React from "react";
import { IconType } from "react-icons/lib";
import DesktopNavigation from "./desktop-nav/DesktopNavigation";
import MobileNavigation from "./mobile-nav/MobileNavigation";

export interface NavItem {
  href: string;
  text: string;
  icon?: IconType;
}

export interface NavigationProps {
  desktopNavItems: NavItem[];
  mobileNavItems: NavItem[];
}

const Navigation: React.FC<NavigationProps> = ({
  desktopNavItems,
  mobileNavItems,
}) => {
  return (
    <>
      <DesktopNavigation navItems={desktopNavItems} />

      <MobileNavigation
        bottomNavItems={mobileNavItems}
        topNavItems={desktopNavItems}
      />
    </>
  );
};

export default Navigation;
