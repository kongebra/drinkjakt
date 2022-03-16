import React from "react";

import Link from "next/link";
import Image from "next/image";

import ProfileTabs from "components/ProfileTabs";

import { useAppUser } from "hooks";

import { NavItem } from "./Navbar/Navbar";

export interface ProfileLayoutProps {}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
  const navItems: Array<NavItem> = [
    {
      href: "/profile",
      text: "Mine favoritter",
    },
    {
      href: "/profile/settings",
      text: "Profil",
    },
  ];

  const { user, isLoading } = useAppUser();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return (
      <div className="container mx-auto">
        <Link href="/api/auth/login">
          <a>Logg Inn</a>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-5">
      <div className="flex justify-center items-center gap-10">
        <Image
          src={user.picture || ""}
          alt={`${user.firstName} ${user.lastName}`}
          width={150}
          height={150}
          className="rounded-full"
        />

        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-semibold">
            Hei, <span className="text-teal-500">{user.firstName}!</span>
          </h2>

          <Link href="/api/auth/logout">
            <a className="text-lg underline hover:text-teal-500 hover:no-underline">
              Logg ut
            </a>
          </Link>
        </div>
      </div>

      <div className="flex flex-col pt-5">
        <ProfileTabs navItems={navItems} />

        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
