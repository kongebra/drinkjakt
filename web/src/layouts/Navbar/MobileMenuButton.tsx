import clsx from "clsx";
import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";

interface Props {
  height: string;
  backgroundColor: string;

  show: boolean;
  onClick: () => void;
}

const MobileMenuButton: React.FC<Props> = ({
  height,
  backgroundColor,
  show,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={clsx(
        "grow flex justify-center items-center gap-3",
        `h-[${height}]`,
        show ? `${backgroundColor} text-teal-500` : "bg-teal-500 text-teal-50"
      )}
      onClick={onClick}
      aria-label="Åpne meny"
    >
      <span className="uppercase text-xl">{show ? "Lukk" : "Meny"}</span>
      {show ? <FaTimes size={24} /> : <FaBars size={24} />}
    </button>
  );
};

export default MobileMenuButton;
