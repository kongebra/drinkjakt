import React from "react";

import Link from "next/link";

import { NavItem } from "layouts/Navigation";
import UserAvatar from "./UserAvatar";
import { useAppUser } from "hooks";
import Button from "components/Button";
import { useRouter } from "next/router";

export interface DesktopNavigationProps {
  navItems: NavItem[];
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ navItems }) => {
  const router = useRouter();
  const { user, isLoading } = useAppUser();

  return (
    <>
      <nav className="hidden lg:flex items-center justify-between px-8 h-16">
        <div className="flex gap-8">
          <Link href="/">
            <a className="text-2xl">
              <span className="mr-0.5">Drink</span>
              <span className="text-sky-500 font-bold">Jakt</span>
            </a>
          </Link>

          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a className="text-base font-semibold hover:text-sky-500 transition">
                  {item.text}
                </a>
              </Link>
            ))}
          </div>
        </div>

        {!isLoading && (
          <div className="flex gap-4 items-center">
            <UserAvatar />

            {!user && (
              <Button
                color="secondary"
                onClick={() => router.push("/api/auth/login")}
              >
                Logg inn
              </Button>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default DesktopNavigation;
