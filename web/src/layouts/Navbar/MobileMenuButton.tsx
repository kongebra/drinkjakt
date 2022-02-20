import React from "react";

import clsx from "clsx";

import { FaBars, FaTimes } from "react-icons/fa";

interface Props {
  show: boolean;
  onClick: () => void;
}

const MobileMenuButton: React.FC<Props> = ({ show, onClick }) => {
  return (
    <button
      type="button"
      className={clsx(
        "grow flex justify-center items-center gap-3",
        `h-[3.5rem]`,
        show ? `bg-teal-50 text-teal-500` : "bg-teal-500 text-teal-50"
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
