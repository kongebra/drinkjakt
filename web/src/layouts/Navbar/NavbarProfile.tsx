import React from "react";

import Link from "next/link";
import Image from "next/image";

import { useAppUser } from "hooks";

const NavbarProfile = () => {
  const { user, isLoading, error } = useAppUser();

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
    <div className="ml-3 relative">
      <Link href="/profile">
        <a
          className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white text-white hover:text-teal-500 uppercase items-center gap-2"
          title="Gå til din profil"
          aria-label="Gå til din profil"
        >
          <Image
            className="h-8 w-8 rounded-full"
            // TODO: Add a placeholder image
            src={user.picture || ""}
            alt={`${user.firstName} ${user.lastName}`}
            width={32}
            height={32}
          />
          Min profil
        </a>
      </Link>
    </div>
  );
};

export default NavbarProfile;
