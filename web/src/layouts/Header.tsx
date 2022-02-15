import React from "react";
import Navigation, { NavLinkItem } from "./Navigation";

const Header = () => {
  const navLinkItems: Array<NavLinkItem> = [
    {
      text: "Home",
      href: "/",
    },
    {
      text: "Recipes",
      href: "/recipes",
    },
  ];

  return <header className="border-bottom"></header>;
};

export default Header;
