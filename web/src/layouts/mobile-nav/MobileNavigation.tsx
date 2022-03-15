import React, { createContext } from "react";

import { NavItem } from "layouts/Navigation";

import MobileBottomNavigation from "./MobileBottomNavigation";
import MobileTopNavigation from "./MobileTopNavigation";
import { useBoolean } from "usehooks-ts";

export interface MobileNavigationProps {
  topNavItems: NavItem[];
  bottomNavItems: NavItem[];
}

export const MobileNavigationContext = createContext<
  ReturnType<typeof useBoolean>
>({
  value: false,
  toggle: () => {
    throw new Error("not implemented");
  },
  setFalse: () => {
    throw new Error("not implemented");
  },
  setTrue: () => {
    throw new Error("not implemented");
  },
  setValue: () => {
    throw new Error("not implemented");
  },
});

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  topNavItems,
  bottomNavItems,
}) => {
  const booleanValue = useBoolean();

  return (
    <MobileNavigationContext.Provider value={booleanValue}>
      <MobileTopNavigation navItems={topNavItems} />
      <MobileBottomNavigation navItems={bottomNavItems} />
    </MobileNavigationContext.Provider>
  );
};

export default MobileNavigation;
