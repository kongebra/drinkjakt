import React from "react";

import Footer from "./Footer";
import Header from "./Header";
import Navbar, { NavItem } from "./Navbar/Navbar";

const Layout: React.FC = ({ children }) => {
  const navItems: Array<NavItem> = [
    {
      href: "/",
      text: "Forsiden",
    },
    {
      href: "/recipes",
      text: "Oppskrifter",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar navItems={navItems} />

      <main className="flex flex-col">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
