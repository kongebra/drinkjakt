import clsx from "clsx";
import React from "react";
import { FaHeart } from "react-icons/fa";

type Size = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";

export interface FavoriteHeartProps {
  active: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;

  size?: Size;

  title?: string;

  className?: string;
}

const sizeStyle: Record<Size, string> = {
  sm: "text-sm",
  md: "",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
};

const FavoriteHeart: React.FC<FavoriteHeartProps> = ({
  active,
  onClick,
  size = "md",
  title,

  className,
}) => {
  const baseStyle =
    "hover:text-rose-500 focus:text-rose-800 cursor-pointer transition ease-in-out duration-300";

  const heartClassName = clsx(
    baseStyle,
    sizeStyle[size],
    {
      "text-rose-500": active,
      "text-slate-500": !active,
    },
    className
  );

  return (
    <button onClick={onClick} title={title} aria-label={title}>
      <FaHeart className={heartClassName} />
    </button>
  );
};

export default FavoriteHeart;
