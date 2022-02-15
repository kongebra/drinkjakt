import { useUser } from "@auth0/nextjs-auth0";
import clsx from "clsx";
import { useAppUser } from "hooks";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

const NavbarProfile = () => {
  const { user, isLoading, error } = useAppUser();

  const [expanded, setExpanded] = useState<boolean>(false);
  const toggle = () => setExpanded((prev) => !prev);

  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    setExpanded(false);
  });

  if (isLoading) {
    return null;
  }

  if (error) {
    return null;
  }

  if (user === undefined) {
    // LOGIN BUTTON
    return (
      <Link href="/api/auth/login">
        <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
          Logg inn
        </a>
      </Link>
    );
  }

  return (
    <div className="ml-3 relative" ref={ref}>
      <div>
        <button
          type="button"
          className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          id="user-menu-button"
          aria-expanded={expanded}
          aria-haspopup="true"
          onClick={toggle}
        >
          <span className="sr-only">Åpne bruker meny</span>
          <img
            className="h-8 w-8 rounded-full"
            src={user.picture}
            alt={`${user.firstName} ${user.lastName}`}
          />
        </button>
      </div>

      {/* <!--
                  Dropdown menu, show/hide based on menu state.

                  Entering: "transition ease-out duration-100"
                    From: "transform opacity-0 scale-95"
                    To: "transform opacity-100 scale-100"
                  Leaving: "transition ease-in duration-75"
                    From: "transform opacity-100 scale-100"
                    To: "transform opacity-0 scale-95"
                --> */}
      <div
        className={clsx(
          expanded ? "" : "hidden",
          "origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        )}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabIndex={-1}
      >
        {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
        <Link href="/profile">
          <a
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200"
            role="menuitem"
            tabIndex={-1}
            id="user-menu-item-0"
          >
            Din Profil
          </a>
        </Link>
        <Link href="/settings">
          <a
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200"
            role="menuitem"
            tabIndex={-1}
            id="user-menu-item-1"
          >
            Instillinger
          </a>
        </Link>
        <Link href="/api/auth/logout">
          <a
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200"
            role="menuitem"
            tabIndex={-1}
            id="user-menu-item-2"
          >
            Logg Ut
          </a>
        </Link>
      </div>
    </div>
  );
};

export default NavbarProfile;
