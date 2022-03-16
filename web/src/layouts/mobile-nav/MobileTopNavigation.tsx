/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";

import { NavItem } from "layouts/Navigation";
import Link from "next/link";

import clsx from "clsx";

import { MobileNavigationContext } from "./MobileNavigation";
import { FaRegUser } from "react-icons/fa";
import { useAppUser } from "hooks";

export interface MobileTopNavigationProps {
  navItems: NavItem[];
}

const MobileTopNavigation: React.FC<MobileTopNavigationProps> = ({
  navItems,
}) => {
  const { user, isLoading } = useAppUser();

  const { value, toggle, setFalse } = useContext(MobileNavigationContext);

  return (
    <>
      <nav className="block fixed inset-x-0 top-0 z-20 bg-white shadow lg:hidden">
        <div className="flex justify-between items-center px-4 h-16">
          <Link href="/">
            <a className="text-2xl" onClick={setFalse}>
              <span className="mr-0.5">Drink</span>
              <span className="text-sky-500 font-bold">Jakt</span>
            </a>
          </Link>

          <button type="button" onClick={toggle} className="space-y-2">
            <span
              className={clsx("block w-8 h-1 bg-slate-900 transition rounded", {
                "rotate-45 translate-y-1.5": value,
              })}
            ></span>
            <span
              className={clsx("block w-8 h-1 bg-slate-900 transition rounded", {
                hidden: value,
              })}
            ></span>
            <span
              className={clsx("block w-8 h-1 bg-slate-900 transition rounded", {
                "-rotate-45 -translate-y-1.5": value,
              })}
            ></span>
          </button>
        </div>
      </nav>

      <div
        className={clsx("absolute inset-0 backdrop-blur-sm bg-black/30 z-10", {
          hidden: !value,
        })}
        onClick={() => {
          setFalse();
        }}
      ></div>
      <div
        className={clsx(
          "fixed inset-y-0 left-0 flex lg:hidden flex-col w-3/4 max-w-sm pt-24 pb-16 px-8 bg-white shadow border-r overflow-y-auto z-10 transition-all",
          { "-translate-x-full": !value }
        )}
      >
        <ul className="flex flex-col mb-8">
          {navItems.map((item) => (
            <li key={item.href} className="flex">
              <Link href={item.href}>
                <a
                  onClick={setFalse}
                  className="text-2xl uppercase text-slate-600 font-semibold h-12 flex items-center"
                >
                  {item.text}
                </a>
              </Link>
            </li>
          ))}
        </ul>

        {!isLoading && user ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img
                className="rounded-full w-10 h-10"
                src={user.picture}
                alt={`${user.firstName} ${user.lastName}`}
              />
              <div className="text-2xl">
                <span>{`Hei, `}</span>
                <Link href={"/profile"}>
                  <a onClick={setFalse} className="text-sky-500">
                    {`${user.firstName}!`}
                  </a>
                </Link>
              </div>
            </div>

            <hr />

            <ul className="flex flex-col gap-2">
              <li>
                <Link href={"/profile/favorites"}>
                  <a onClick={setFalse}>Mine favoritter</a>
                </Link>
              </li>
              <li>
                <Link href={"/profile"}>
                  <a onClick={setFalse}>Profil</a>
                </Link>
              </li>
              <li>
                <Link href={"/logout"}>
                  <a onClick={setFalse}>Logg ut</a>
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex">
            <Link href={"/login"}>
              <a
                onClick={setFalse}
                className="text-2xl uppercase text-slate-600 font-semibold h-12 flex items-center gap-2"
              >
                <FaRegUser />
                <span>Logg inn</span>
              </a>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default MobileTopNavigation;
