import React, { useRef } from "react";

import clsx from "clsx";

import { useBoolean, useOnClickOutside } from "usehooks-ts";

import Avatar from "components/Avatar";

import { useAppUser } from "hooks";
import Link from "next/link";
import { IconType } from "react-icons/lib";
import { FaPowerOff, FaRegHeart, FaRegUser } from "react-icons/fa";

interface MenuLinkProps {
  href: string;
  icon: IconType;
  onClick: (e: any) => void;
}

const MenuLink: React.FC<MenuLinkProps> = ({
  href,
  icon,
  children,
  onClick,
}) => {
  const Icon = icon;

  return (
    <Link href={href}>
      <a
        className="hover:bg-slate-200 hover:text-sky-500 px-6 py-2 flex gap-2 items-center"
        onClick={onClick}
      >
        <Icon />
        {children}
      </a>
    </Link>
  );
};

const UserAvatar = () => {
  const { user } = useAppUser();

  const { value, setFalse, toggle } = useBoolean();
  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    setFalse();
  });

  if (!user) {
    return null;
  }

  return (
    <div className="relative" ref={ref}>
      <Avatar
        image={user?.picture}
        imageAlt={`${user?.firstName} ${user?.lastName}`}
        onClick={toggle}
        indicator={user && "online"}
      />
      <div
        className={clsx(
          "absolute top-12 -right-4 rounded-xl z-10 min-w-[18rem] w-fit bg-white shadow transition flex flex-col overflow-hidden py-2 border",
          {
            "opacity-0 translate-y-32 -z-50": !value,
            "opacity-100 translate-y-0": value,
          }
        )}
      >
        <Link href={"/profile"}>
          <a
            className="hover:bg-slate-200 hover:text-sky-500 px-6 py-2 flex gap-2 items-center"
            onClick={setFalse}
          >
            <Avatar
              image={user?.picture}
              imageAlt={`${user?.firstName} ${user?.lastName}`}
              onClick={toggle}
              indicator={user && "online"}
            />
            <div className="flex flex-col gap-0 justify-center">
              <span className="font-semibold">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="text-sm text-slate-600">{user?.email}</span>
            </div>
          </a>
        </Link>

        <hr />

        <MenuLink href="/profile" icon={FaRegUser} onClick={setFalse}>
          Profile
        </MenuLink>
        <MenuLink href="/favorites" icon={FaRegHeart} onClick={setFalse}>
          Favoritter
        </MenuLink>

        <hr />
        <MenuLink href="/api/auth/logout" icon={FaPowerOff} onClick={setFalse}>
          Logg ut
        </MenuLink>
      </div>
    </div>
  );
};

export default UserAvatar;
