import React from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import clsx from "clsx";
import { useBoolean } from "usehooks-ts";

import { FaBars, FaTimes, FaUser } from "react-icons/fa";

import { useAppUser } from "hooks";

import { NavItem } from "./Navbar";

interface Props {
  navItems: Array<NavItem>;
}

const MobileMenu: React.FC<Props> = ({ navItems }) => {
  const router = useRouter();

  const { user } = useAppUser();

  const { value, toggle } = useBoolean();

  const backgroundColor = "bg-teal-50";

  return (
    <>
      <div className="lg:hidden grow flex">
        <button
          type="button"
          className={clsx(
            "grow h-16 flex justify-center items-center gap-3",
            value
              ? `${backgroundColor} text-teal-500`
              : "bg-teal-500 text-teal-50"
          )}
          onClick={toggle}
          aria-label="Åpne meny"
        >
          <span className="uppercase text-2xl">{value ? "Lukk" : "Meny"}</span>
          {value ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      <div
        className={clsx(
          `absolute left-0 top-16 w-full transition-all duration-300 ease-in-out z-50 overflow-hidden`,
          {
            "h-96": value,
            "h-0": !value,
          }
        )}
      >
        <div className={`flex flex-col gap-5 px-5 py-5 ${backgroundColor}`}>
          <ul className="flex flex-col text-xl uppercase">
            {navItems.map((item) => (
              <li
                key={item.href}
                className={clsx("h-14 active:text-teal-500", {
                  "text-teal-500": item.href === router.asPath,
                })}
              >
                <Link href={item.href}>
                  <a className="h-14 flex items-center">
                    <span>{item.text}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>

          {user ? (
            <>
              <div className="flex items-center gap-3 pb-5 border-b border-slate-200">
                <Image
                  src={user?.picture || ""}
                  width={64}
                  height={64}
                  alt={user?.firstName}
                  className="rounded-full"
                />
                <div className="flex gap-1 text-3xl font-semibold">
                  <span>Hei,</span>
                  <Link href="/profile">
                    <a className="text-teal-500">{user.firstName}!</a>
                  </Link>
                </div>
              </div>

              <div>
                <ul className="flex flex-col gap-3">
                  <li>
                    <Link href="/profile/favorites">
                      <a>Mine favoritter</a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/profile">
                      <a>Profil</a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/api/auth/logout">
                      <a>Logg ut</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div>
              <Link href="/api/auth/login">
                <a className="text-xl uppercase flex items-center gap-3">
                  <FaUser size={20} />
                  <span>Logg Inn</span>
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
