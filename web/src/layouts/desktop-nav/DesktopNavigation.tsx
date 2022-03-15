import { NavItem } from "layouts/Navigation";
import React from "react";

export interface DesktopNavigationProps {
  navItems: NavItem[];
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({}) => {
  return (
    <>
      <nav className="hidden lg:flex">
        <p>desktop navigation</p>
      </nav>
    </>
  );
};

export default DesktopNavigation;
