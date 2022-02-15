import React, { useContext } from "react";
import { NavbarContext } from "./Navbar";
import MobileHamburger from "./MobileHamburger";

const MobileHamburgerButton = () => {
  const { mobileIsOpen, toggleMobileMenu } = useContext(NavbarContext);

  return (
    <button
      type="button"
      className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
      aria-controls="mobile-menu"
      aria-expanded={mobileIsOpen}
      onClick={toggleMobileMenu}
    >
      <span className="sr-only">Åpne hovedmeny</span>

      <MobileHamburger />
    </button>
  );
};

export default MobileHamburgerButton;
