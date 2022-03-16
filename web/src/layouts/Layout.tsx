import { useAppUser } from "hooks";
import React, { useMemo } from "react";
import { FaHeart, FaHome, FaSearch, FaSignInAlt, FaUser } from "react-icons/fa";

import Footer from "./Footer";

import Navigation, { NavItem } from "./Navigation";

const Layout: React.FC = ({ children }) => {
  const { user } = useAppUser();

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

  const mobileNavItems: Array<NavItem> = useMemo(() => {
    const items: Array<NavItem> = [
      {
        href: "/",
        text: "Forsiden",
        icon: FaHome,
      },
      {
        href: "/search",
        text: "Søk",
        icon: FaSearch,
      },
    ];

    if (user) {
      items.push({
        href: "/favorites",
        text: "Favoritter",
        icon: FaHeart,
      });
      items.push({
        href: "/profile",
        text: "Profil",
        icon: FaUser,
      });
    } else {
      items.push({
        href: "/login",
        text: "Logg inn",
        icon: FaSignInAlt,
      });
    }

    return items;
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation desktopNavItems={navItems} mobileNavItems={mobileNavItems} />

      <main className="flex flex-auto flex-col bg-gray-200">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
